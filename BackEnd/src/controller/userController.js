import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';


export const infoUser = async (req, res) => {

    const token = req.headers.authorization.split(' ').pop();
    const payload = await decodeJwt(token);

    let user = await Users.findOne({_id : payload.id_User});

    if (user) {
        return res.status(220).json({
            message: `Información Personal`,
            code : 220,
            infoUser: {
                '_id': user._id,
                'emailI': user.emailI,
                'identify': user.identify,
                'fullName': user.fullName
            },
            // infoUser: user,
        })
    } else {
        return res.status(420).json({
            message: `Ningun Usuario`,
            code : 420,
            infoUser: user,
        })
    }
    
}