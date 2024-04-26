import { EthicalImpacts } from "../models/EthicalImpacts.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

// Ver éticas e impactos de la ficha
export const ethicalImpactsView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let ethicalImpacts = await DataApp.findOne({user: payload.id_User});
        if(ethicalImpacts.ethicalImpacts == undefined){
            return res.status(440).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                res: ethicalImpacts.ethicalImpacts,
            })
        }

    } catch (error) {
        res.status(440).json({
            error: error,
            message: "El dato no existe u ocurrio un error con los datos de cliente",
            code: 440
        })
    }
}

// Guardar éticas e impactos de la ficha
export const ethicalImpactsCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const ethicalImpacts = new EthicalImpacts(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"ethicalImpacts":ethicalImpacts});

        return res.status(200).json({
            message: `Guardado exitoso de Eticas e Impactos`,
            code : 230,
            data: ethicalImpacts
        })

    } catch (error) {
        res.status(410).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}
