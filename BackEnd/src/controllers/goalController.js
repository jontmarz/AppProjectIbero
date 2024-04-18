import { Goal } from "../models/Goal.js";
import { DataApp } from "../models/DataApp.js";
import { decodeJwt } from '../utils/jwtAuth.js';

export const goalView = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        let goal = await DataApp.findOne({user: payload.id_User});

        return res.status(240).json({
            message: `Datos Cargados`,
            code : 240,
            dirCauses: goal.problems.dirCauses,
            centralProb: goal.problems.centralProb,
            goals:  goal.goals
        })

    } catch (error) {
        res.status(440).json({
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440,
            error: error,
        })
    }
}

export const goalCreate = async (req, res) => {
    try {
        const data = req.body.goals;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const goal = new Goal(data);
        const id_User = payload.id_User;
        await DataApp.findOneAndUpdate({user: id_User}, {"goals":goal});

        return res.status(200).json({
            message: `Guardado exitoso de objetivos`,
            code : 230,
        })

    } catch (error) {
        res.status(410).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}