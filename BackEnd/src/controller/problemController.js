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

        await dataApp.save();

        return res.status(200).json({
            message: `CREACION EXITOSA DE ARBOL DE PROBLEMAS`,
            code : 1,
        })

    } catch (error) {
        res.status(500).json({
            message: "EL DATO NO EXISTE O OCURRIO UN ERROR CON LOS DATOS DE CLIENTES",
            code: -1
        })
    }
}



