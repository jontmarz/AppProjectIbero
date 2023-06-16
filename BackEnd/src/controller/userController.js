import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';


export const infoUser = async (req, res) => {

    const token = req.headers.authorization.split(' ').pop();
    const payload = await decodeJwt(token);
    console.log(payload.id_User);
}