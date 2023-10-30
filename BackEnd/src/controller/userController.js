import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// FUNCION PARA VER DATOS DE USUARIO
export const infoUser = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
    
        let user = await Users.findOne({_id : payload.id_User});
        
        return res.status(200).json({
            message: `Información Personal`,
            code : 220,
            infoUser: {
                '_id': user._id,
                'emailI': user.emailI,
                'emailP': user.emailP,
                'identify': user.identify,
                'fullName': user.fullName,
                'typeDoc': user.typeDoc,
                'faculty': user.faculty,
                'academicProgram': user.academicProgram,
                'role': user.role,
                'creationDate': user.creationDate,
            },
        })
        
    } catch (error) {
        return res.status(400).json({
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
    
        let user = await Users.find();
        
        return res.status(200).json({
            message: `Información Usuarios`,
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
            user = new Users(req.body);
            await user.save();

            return res.status(200).json({
                message: "UPDATE ha sido realizado con exito",
                code: 220,
                user: user
            })
            
        }

    } catch (e) {
        return res.status(420).json({
            message: e.message,
            code:420
        })
    }
}