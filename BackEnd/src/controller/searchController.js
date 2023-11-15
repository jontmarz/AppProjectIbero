import { Users } from '../models/Users.js';
import { DataApp } from '../models/DataApp.js';
import { decodeJwt } from '../utils/jwtAuth.js';

export const searchdata = async (req, res) => {
    try {
        // const { nameUser, idUser, titleProj } = req.query;

        const dataSearch = req.query;

        console.log(dataSearch.idUser);

        if (dataSearch.nameUser || dataSearch.idUser) {
            let user = await Users.find({
                $or: [
                    { fullName: dataSearch.nameUser },
                    { identify: dataSearch.idUser }
                ]
            });

            if (user.length == 0) {
                return res.status(400).json({
                    message: `El usuario no existe`,
                    code : 440,
                })
            }
            
            let student = user[0]._id.toString();
            let data = await DataApp.findOne({ user: student });
            
            if (data) {
                return res.status(200).json({
                    message: `Estos son los datos de la ficha`,
                    code : 240,
                    data: data,
                })
            } else {
                return res.status(400).json({
                    message: `El usuario no tiene ficha registrada`,
                    code : 440,
                })
            }
        } else if (dataSearch.titleProj) {
            let data = await DataApp.findOne({ "goals.titleProj": dataSearch.titleProj });
            
            if (data) {
                return res.status(200).json({
                    message: `Estos son los datos de la ficha`,
                    code : 240,
                    data: data,
                })
            } else {
                return res.status(400).json({
                    message: `El proyecto no existe`,
                    code : 440,
                })
            }
        }
        
    } catch (error) {
        return res.status(400).json({
            message: `Hubo un error en la consulta`,
            code : 430,
        })
    }
}