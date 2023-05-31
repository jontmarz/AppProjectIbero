import {Users} from "../models/Users.js";
import { generarJwt } from "../utils/jwtAuth.js";

// FUNCION PARA CREAR UN USUARIO NUEVO
export const signup = async ( req , res ) => {
    try {
        const request = req.body;

        let user = await Users.findOne({identify: request.identify})
        if (user) {
            return res.status(401).json({
                status: 401,
                code: 0,
                message: "ESTE USUARIO YA EXISTE EN BASE DE DATOS"
            })
        }
        user = new Users(req.body);
        await user.save();

        const payload ={
            'User' : user.identify,
            'Nombre' : user.fullName,
            'id_User' : user._id,
        }

        const {tokenGenerado, expiresIn} = await generarJwt(payload);

        return res.status(200).json({
            status: 200,
            code: 1,
            message: "SING-IN FUE REALIZADO CON EXITO",
            token: {
                tokenid: tokenGenerado,
                expires: expiresIn,
            }
        })
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
        const { identify, password } = req.body;

        let user = await Users.findOne({ identify })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(403).json({
                status: 403,
                code: 0,
                message: "EL USUARIO O CONTRASEÑA EQUIVOCADO"
            })
        }

        const payload ={
            'User' : user.identify,
            'Nombre' : user.fullName,
            'id_User' : user._id,
        }

        const {tokenGenerado, expiresIn} = await generarJwt(payload);

        return res.status(200).json({
            status: 200,
            code: 1,
            message: "LOG-IN FUE REALIZADO CON EXITO",
            token: {
                tokenid: tokenGenerado,
                expires: expiresIn,
            }
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        })
    }
}

// FUNCION PARA LOGEO DE USUARIOS
export const logout = async ( req , res ) => {
    try {
        res.clearCookie("refreshCookies ");
        return res.status(200).json({
            status:200,
            code: 1,
            message: {ok: true} });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            code:0,
            message: e.message
        })
    }
}
