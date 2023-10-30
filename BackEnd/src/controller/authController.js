import { DataApp } from "../models/DataApp.js";
import {Users} from "../models/Users.js";
import { generarJwt } from "../utils/jwtAuth.js";

// FUNCION PARA CREAR UN USUARIO NUEVO
export const signup = async ( req , res ) => {
    try {
        const request = req.body;

        let user = await Users.findOne({emailI: request.emailI})
        if (user) {
            return res.status(400).json({
                message: "Este usuario ya existe en base de datos",
                code: 410
            })
        }else {
            user = new Users(req.body);
            await user.save();

            const dataApp = DataApp();
            dataApp.set({"user": user._id});
            await dataApp.save();

            const payload ={
                'User' : user.emailI,
                'Nombre' : user.fullName,
                'id_User' : user._id,
            }

            const {tokenGenerado, expiresIn} = await generarJwt(payload);

            return res.status(200).json({
                message: "SING-IN fue realizado con exito",
                code: 220,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        }
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        })
    }
}

// FUNCION PARA LOGEO DE USUARIOS
export const login = async ( req , res ) => {
    try {
        const { emailI, password } = req.body;

        let user = await Users.findOne({ emailI })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(420).json({
                message: "El usuario o contraseña incorrectos",
                code: 420
            })
        }

        const payload ={
            'User' : user.emailI,
            'Nombre' : user.fullName,
            'id_User' : user._id,
        }

        const {tokenGenerado, expiresIn} = await generarJwt(payload);

        return res.status(220).json({
            message: "LOG-IN fue realizado exitosamente",
            code: 220,
            token: {
                tokenid: tokenGenerado,
                expires: expiresIn,
            }
        })
    } catch (e) {
        return res.status(420).json({
            message: e.message,
            code:420
        })
    }
}

// FUNCION PARA LOGEO DE USUARIOS
export const logout = async ( req , res ) => {
    try {
        res.clearCookie("refreshCookies ");
        return res.status(210).json({
            code: 210,
            message: {ok: true} });
    } catch (e) {
        return res.status(410).json({
            code:410,
            message: e.message
        })
    }
}
