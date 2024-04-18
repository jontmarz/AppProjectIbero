import { DataApp } from "../models/DataApp.js";
import { Users } from "../models/Users.js";
import { generarJwt } from "../utils/jwtAuth.js";

// FUNCION PARA CREAR UN USUARIO NUEVO
export const signup = async ( req , res ) => {
    try {
        const request = req.body;
        // Verificar si el usuario ya existe
        let user = await Users.findOne({emailI: request.emailI})
        if (user) {
            return res.status(400).json({
                message: "Este usuario ya existe en base de datos",
                code: 410
            })
        }else {
            // Si el usuario no existe, se crea un nuevo usuario
            user = new Users(request);
            await user.save();
            // Verificar si es el primer usuario tiene datos en DataApp
            const dataApp = DataApp();
            let userData = await Users.find({});
            if (!userData.length === 0) {
                // Si no hay datos en Users, se crea un nuevo usuario con rol de SuperUser
                await Users.updateOne({ _id: user._id }, { $set: { role: "SuperUser" } })
                // Se crea un nuevo registro en DataApp
                dataApp.set({ "user": user._id, });
                await dataApp.save();
            } else {
                // Si ya hay datos en Users, se crea un nuevo registro en DataApp con el id del Usuario
                dataApp.set({"user": user._id});
                await dataApp.save();
            }
            
            // Se genera el token de autenticación
            const payload ={
                'User' : user.emailI,
                'Nombre' : user.fullName,
                'id_User' : user._id,
            }
            const {tokenGenerado, expiresIn} = await generarJwt(payload);
            // Se envía la respuesta al cliente
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
        // En caso de error, se envía la respuesta al cliente
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

        // Verificar si el usuario existe y si los datos son correctos
        if (!user || !(await user.comparePassword(password))) {
            return res.status(420).json({
                message: "El usuario o contraseña incorrectos",
                code: 420
            })
        }
        // Si el usuario existe y los datos son correctos, se genera el token de autenticación
        const payload ={
            'User' : user.emailI,
            'Nombre' : user.fullName,
            'id_User' : user._id
        }
        const {tokenGenerado, expiresIn} = await generarJwt(payload);

        // Verificar si el usuario ya tiene datos en la ficha de investigación
        let userDataApp = await DataApp.findOne({user: user._id});
        // console.log(user.role, userDataApp, user._id);
        if (user.role === "Docente") {
            // Si el usuario es docente
            return res.status(200).json({
                message: "LOG-IN docente fue realizado con exito. Revisa tu perfil de usuario",
                code: 210,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        } else if(!userDataApp) {
            // Si el usuario no tiene datos en la ficha de investigación
            return res.status(200).json({
                message: "LOG-IN fue realizado con exito, puedes ingresar los datos de tu ficha de investigación",
                code: 230,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        } else {
            // Si el usuario ya tiene datos en la ficha de investigación
            return res.status(200).json({
                message: "LOG-IN estudiante fue realizado con exito. Revisa tu perfil de usuario",
                code: 220,
                token: {
                    tokenid: tokenGenerado,
                    expires: expiresIn,
                }
            })
        }
    } catch (e) {
        // En caso de error, se envía la respuesta al cliente
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
