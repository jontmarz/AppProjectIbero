import { verificarJwt } from "../utils/jwtAuth.js";

export const middlewareToken = async(req,res,next) => {
    try {
    const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                message: "DEBE ENVIAR UN TOKEN VALIDO!",
                code: -1
            })
        }

        const token = authHeader.split(' ').pop();

        const payload = await verificarJwt(token);

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Hubo un error al intentar verificar token",
            code: -1
        })
    }

}
