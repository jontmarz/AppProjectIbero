import { Record } from "../models/Record.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const recordView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let record = await DataApp.findOne({user: payload.id_User});
        if (!record) {
            return res.status(200).json({
                message: `No hay datos`,
                code : 220,
            })
        }
        else if (record.records == undefined){
            return res.status(440).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                records: record.records.recordlist,
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

export const recordCreate = async (req, res) => {
    try {
        const data = req.body.records;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const record = new Record({recordlist:data});
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"records": record});
        return res.status(200).json({
            message: `Guardado exitoso de Records`,
            code : 230,
        })

    } catch (error) {
        res.status(410).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}