import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const dataView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let data = await DataApp.find();
        // let data = await DataApp.findOne({user: payload.id_User});
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