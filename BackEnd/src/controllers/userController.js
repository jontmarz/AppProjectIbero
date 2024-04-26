import { Users } from "../models/Users.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// FUNCION PARA VER DATOS DE USUARIO
export const infoUser = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        const role = payload.role
    
        let user = await Users.findOne({_id : payload.id_User});
        
        return res.status(200).json({
            message: `Información Personal`,
            code : 220,
            infoUser: user
        })
        
    } catch (error) {
        return res.status(410).json({
            message: `El usuario no existe`,
            code : 430,
            error: error,
        })
    }
    
}

// CONSULTAR LOS DATOS DE TODOS LOS USUARIOS
export const dataUsers = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
    
        if (payload) {
            let users = await Users.find();
        
            return res.status(200).json({
                message: `Información Usuarios`,
                code : 220,
                infoUsers: users,
            })
        } else {
            return res.status(410).json({
                message: `El usuario debe iniciar sesión`,
                code : 430,
            })
        }
        
    } catch (error) {
        return res.status(410).json({
            message: `El usuario no existe`,
            code : 430,
            error: error,
        })
    }
    
}

// CONSULTAR LOS DATOS DE UN USUARIO
export const dataUser = async (req, res) => {
    let { idUser } = req.params;
    
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
    
        let user = await Users.findOne({_id : idUser});
        
        return res.status(200).json({
            message: `Información del Usuario`,
            code : 220,
            infoUser: user,
        })
        
    } catch (error) {
        return res.status(400).json({
            message: `El usuario no existe`,
            code : 430,
            error: error,
        })
    }
    
}

// FUNCION PARA EDITAR USUARIO
export const editUser = async ( req , res ) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        let user = await Users.findOne({_id : payload.id_User})

        if (!user) {
            return res.status(400).json({
                message: "El usuario no existe en base de datos",
                code: 410
            })
        } else {
            // Verifica si se ha proporcionado la contraseña
            if (req.body.password) delete req.body.password // Elimina la contraseña si no se proporciona
            delete req.body.identify // Elimina el documento porque no se puede modificar
            delete req.body.emailI // Elimina el correo institucional porque no se puede modificar
            delete req.body.creationDate // Elimina la fecha de creación si no se proporciona
            delete req.body.role // Elimina el rol si no se proporciona

            // Actualiza los campos del usuario
            Object.assign(user, req.body)
            await user.save();

            //Actualiza el campo de deadline en DataApp
            let dataApp = await DataApp.findOne({user: user._id})
            if(!dataApp) {
                dataApp = await DataApp.findOne({user: user._id, deadline: req.body.deadline})
            } else {
                dataApp.deadline = req.body.deadline
            }
            await dataApp.save();

            return res.status(200).json({
                message: "UPDATE ha sido realizado con exito",
                code: 220
            })
            
        }

    } catch (e) {
        return res.status(420).json({
            message: e.message,
            code: 420
        })
    }
}

// FUNCION PARA EDITAR USUARIO POR SUPERUSER
export const editUserAdmin = async ( req , res ) => {
    let { idUser } = req.params;

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        if(payload.role === 'SuperUser') {
            let user = await Users.findByIdAndUpdate(idUser, req.body, { new: true})

            return res.status(200).json({
                message: "SuperUser ha actualizado los datos con exito",
                code: 220,
                user
            })

        } else {
            return res.status(410).json({
                message: "El usuario no tiene permisos para realizar esta acción",
                code: 410
            })
        }
    } catch (e) {
        return res.status(420).json({
            message: e.message,
            code:420
        })
    }
}