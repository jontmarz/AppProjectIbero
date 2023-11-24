import { Users } from '../models/Users.js';
import { DataApp } from '../models/DataApp.js';

export const searchdata = async (req, res) => {
    try {
        const dataSearch = req.query;

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
            let data = await DataApp.find({ user: student });
            
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
            let data = await DataApp.find({ "goals.titleProj": dataSearch.titleProj });
            
            if (data.length === 0) {
                return res.status(400).json({
                    message: `El proyecto no existe`,
                    code : 440,
                })
            } else if(data) {
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
        if (error.response && error.response.status === 400) {
            return res.status(400).json({
                message: `El proyecto no existe`,
                code : 440,
            })
        } else {
            return res.status(400).json({
                message: `Hubo un error en la consulta`,
                code : 430,
            })
        }
    }
}