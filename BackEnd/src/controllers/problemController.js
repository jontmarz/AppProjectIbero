import { Problem } from "../models/Problem.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const problemView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let problem = await DataApp.findOne({user: payload.id_User});
        if(problem.problems == undefined){
            return res.status(440).json({
                message: `No se han guardado datos`,
                code : 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code : 240,
                problemas: problem.problems,
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

export const problemCreate = async (req, res) => {
    try {
        const data = req.body.tree;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const problema = new Problem(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"problems":problema});

        return res.status(200).json({
            message: `Guardado exitoso de arbol de problemas`,
            code : 230,
        })

    } catch (error) {
        res.status(410).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}
