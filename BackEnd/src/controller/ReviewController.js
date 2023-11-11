import { Review } from '../models/Reviews.js';
import { Users } from '../models/Users.js';
import { DataApp } from '../models/DataApp.js';
import { decodeJwt } from '../utils/jwtAuth.js';

export const reviewViews = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);
        const reviews = await DataApp.findOne({ user: payload.id_User });
        // const dataApp = await DataApp.findOne({ user: payload.id_User });
        // let reviews = await dataApp.findOne({ dataApp: payload.id_DataApp });

<<<<<<< HEAD
        const result = dataApps.map((dataApp) => {
            let dataAppId = dataApp._id;
            let dataTitle = dataApp.goals.titleProj;
            let dataUser = dataApp.user;
            let dataAppReview = dataApp.review.comment

            // return { id: dataAppId}
            return {
                project: dataAppId,
                title: dataTitle,
                user: dataUser,
                comment: dataAppReview
            }
        })

        if (dataApps == undefined) {
=======
        if (reviews.review == undefined) {
>>>>>>> parent of 092d66e (reviews docente)
            return res.status(400).json({
                message: `Ya se ha realizado una reseña`,
                code: 440,
            })
        } else {
            return res.status(200).json({
                message: `Datos Cargados`,
                code: 240,
<<<<<<< HEAD
                data: result,
=======
                review: reviews.review,
>>>>>>> parent of 092d66e (reviews docente)
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
        const data = req.body;
        const token = req.headers.authorization.split(' ').pop();
        const payload = await decodeJwt(token);

        const review = new Review(data);
        await DataApp.findOneAndUpdate({user: payload.id_User}, { "review": review });

        return res.status(200).json({
            message: `Guardado exitoso de la reseña`,
            code: 230,
            data: review.comment
        })

    } catch (error) {
        res.status(400).json({
            message: "Fallo en el guardado del formulario",
            code: 430
        })
    }
}