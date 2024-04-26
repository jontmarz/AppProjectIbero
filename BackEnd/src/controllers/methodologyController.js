import { Methodology } from "../models/Methodology.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// Ver metodología de la ficha
export const methodologyView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let methodData = await DataApp.findOne({user: payload.id_User});
        
        if (methodData.methodology == undefined) {
            return res.status(400).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                data: methodData.methodology,
            })
        }

    } catch (error) {
        res.status(410).json({
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440,
            error: error,
        })
    }
}

// Guardar metodología de la ficha
export const methodologyCreate = async (req, res) => {
    try {
        const data = req.body.methodology;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const methodology = new Methodology(data);
        const id_User = payload.id_User;
        await DataApp.findOneAndUpdate({user: id_User}, {"methodology":methodology});

        return res.status(200).json({
            message: `Guardado exitoso de metodologia`,
            code : 230,
            data: methodology
        })
    } catch (error) {
        res.status(410).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}