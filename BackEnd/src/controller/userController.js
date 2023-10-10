import { Users } from "../models/Users.js";
import { decodeJwt } from '../utils/jwtAuth.js';


export const infoUser = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
    
        let user = await Users.findOne({_id : payload.id_User});
        
        return res.status(200).json({
            message: `Información Personal`,
            code : 220,
            infoUser: {
                '_id': user._id,
                'emailI': user.emailI,
                'emailP': user.emailP,
                'identify': user.identify,
                'fullName': user.fullName,
                'typeDoc': user.typeDoc,
                'faculty': user.faculty,
                'academicProgram': user.academicProgram,
                'role': user.role,
                'creationDate': user.creationDate,
            },
        })
        
    } catch (error) {
        return res.status(400).json({
            message: `El usuario no existe`,
            code : 430,
            error: error,
        })
    }
    
}