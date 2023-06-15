import {Problem} from "../models/Problem.js";
import { DataApp } from "../models/DataApp.js"
import { decodeJwt } from '../utils/jwtAuth.js';


export const problemCreate = async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const problema = new Problem(data);
        const dataApp = DataApp();

        dataApp.set({"problems":problema});
        dataApp.set({"user": payload.id_User});

        await dataApp.save();

        return res.status(200).json({
            message: `Creacion exitosa de arbol de problemas`,
            code : 1,
        })

    } catch (error) {
        res.status(500).json({
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: -1
        })
    }
}



