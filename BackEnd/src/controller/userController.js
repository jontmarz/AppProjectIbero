import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';


export const infoUser = async (req, res) => {

    const token = req.headers.authorization.split(' ').pop();
    const payload = await decodeJwt(token);

    let user = await Users.findOne({_id : payload.id_User});

    return res.status(200).json({
        message: `Información Personal`,
        code : 1,
        infoUser: user,
    })
}