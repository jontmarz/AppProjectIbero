import { DataApp } from "../models/DataApp.js";
import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const dataView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        // let data = await DataApp.find();
        let data = await DataApp.findOne({user: payload.id_User});
        if(data == undefined){
            return res.status(400).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                data: data,
            })
        }

    } catch (error) {
        res.status(440).json({
            error: error,
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440
        })
    }
}

export const dataViews = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        const queryDoce = false
        const docente = Users.find({_id : payload.id_User, role: 'Docente'}, (err, docente) => {
            if (err) {
                console.error('Error al consultar los datos ' + err);
            } else {
                // console.log('Datos consultados correctamente ' + docente);
            }
        })
        
        if(docente){
            let data = await DataApp.find();
            if(data == undefined){
                return res.status(400).json({
                    message: `No se han guardado datos`,
                    code : 440,
                })
            } else {
                return res.status(200).json({
                    message: `Todos los Datos Cargados`,
                    code : 240,
                    data: data,
                })
            }
        } else {
            return res.status(400).json({
                message: `Acceso no autorizado`,
                code : 450,
            })
        }

    } catch (error) {
        res.status(440).json({
            error: error,
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440
        })
    }
}

export const profdataView = async (req, res) => {
    try {
        /* const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token); */
        const { idProj } = req.params;
        // let data = await DataApp.find();
        let data = await DataApp.findOne({_id: idProj});
        if(!data){
            return res.status(400).json({
                message: `La ficha no existe`,
                code : 440,
            })
        }
        return res.status(200).json({
            message: `Datos Cargados`,
            code : 240,
            data: data,
        })

    } catch (error) {
        res.status(440).json({
            error: error,
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440
        })
    }
}