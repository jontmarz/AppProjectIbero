import { Description } from "../models/Description.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';


export const DescriptionView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let description = await DataApp.findOne({user: payload.id_User});
        if(description.description == undefined){
            return res.status(200).json({
                message: `No se han guardado datos`,
                code : 1,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 1,
                description: description.description,
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error,
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 0
        })
    }
}

export const DescriptionCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const description = new Description(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"description":description});

        return res.status(200).json({
            message: `Guardado exitoso la descripción`,
            code : 1,
        })

    } catch (error) {
        res.status(500).json({
            message: "Fallo en el guardado del formulario",
            code: 0
        })
    }
}