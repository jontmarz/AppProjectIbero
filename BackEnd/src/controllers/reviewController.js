import { Review } from '../models/Reviews.js';
import { Users } from '../models/Users.js';
import { DataApp } from '../models/DataApp.js';
import { decodeJwt } from '../utils/jwtAuth.js';

export const reviewViews = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        const dataApps = await DataApp.find({review: {$exists: true}});

        // Otra forma de hacerlo
        /* const dataApps = await DataApp.find({ "review.author": payload.id_User });
        const dataApps = await DataApp.find();
        let reviews = await dataApp.findOne({ dataApp: payload.id_DataApp }); */

        const review = dataApps.filter((dataApp) => {
            return dataApp.review.author == payload.id_User
        })


        const result = review.map((dataApp) => {
            let dataAppId = dataApp._id;
            let dataTitle = dataApp.goals.titleProj;
            let dataUser = dataApp.user;
            let dataAppReview = dataApp.review.comment

            return {
                project: dataAppId,
                title: dataTitle,
                user: dataUser,
                comment: dataAppReview
            }
        })

        if (dataApps == undefined) {
            return res.status(400).json({
                message: `Ya se ha realizado una reseña`,
                code: 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code: 240,
                data: result,
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: "El dato no existe o ocurrio un error con los datos de cliente",
            code: 440,
            error: error,
        })
    }
}

export const reviewCreate = async (req, res) => {
    try {
        const { idProject } = req.params;
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const review = new Review({comment: data.comment, author: payload.id_User});
        await DataApp.findOneAndUpdate({_id: idProject}, { "review": review });

        return res.status(200).json({
            message: `Guardado exitoso de la reseña`,
            code: 230,
            data: review
        })

    } catch (error) {
        res.status(400).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}