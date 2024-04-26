import { Justification } from "../models/Justification.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// Ver justificación de la ficha
export const JustificationView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let Justification = await DataApp.findOne({user: payload.id_User});
        if(Justification.justification == undefined){
            return res.status(400).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                justification: Justification.justification,
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440,
            error: error,
        })
    }
}

// Guardar justificación de la ficha
export const JustificationCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const justification = new Justification(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"justification": justification});

        return res.status(200).json({
            message: `Guardado exitoso la justificación`,
            code : 230,
            data: justification.justification
        })

    } catch (error) {
        res.status(400).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}