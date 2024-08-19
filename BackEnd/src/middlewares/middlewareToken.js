import { verificarJwt } from "../utils/jwtAuth.js";
import { Users } from "../models/Users.js";

export const middlewareToken = async(req, res, next) => {
    try {
    const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(410).json({
                message: "debe enviar un token valido!",
                code: 410
            })
        }

        const token = authHeader.split(' ').pop();
        const payload = await verificarJwt(token);

        const user = await Users.findOne({ _id: payload.id_User });
        if (!user) {
            return res.status(410).json({
                message: "Usuario no encontrado",
                code: 410
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(410).json({
            message: "Hubo un error al intentar verificar token",
            code: 410
        })
    }

}
