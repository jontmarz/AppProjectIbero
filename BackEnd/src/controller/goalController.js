
import { Goal } from "../models/Goal.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const goalView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let goal = await DataApp.findOne({user: payload.id_User});

        return res.status(200).json({
            message: `Datos Cargados`,
            code : 1,
            dirCauses: goal.problems.dirCauses,
            centralProb: goal.problems.centralProb,
            goals:  goal.goals
        })

    } catch (error) {
        res.status(500).json({
            error: error,
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 0
        })
    }
}

export const goalCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const goal = new Goal(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, {"goals":goal});

        return res.status(200).json({
            message: `Guardado exitoso de objetivos`,
            code : 1,
        })

    } catch (error) {
        res.status(500).json({
            message: "Fallo en el guardado del formulario",
            code: 0
        })
    }
}