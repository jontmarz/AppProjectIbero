import { validationResult, body} from "express-validator";

export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    const errores = errors.formatWith( error => error.msg)
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Error en algun campo del formulario",
            code: 0,
            errors: errores.mapped()
        });
    }
    next()
}
export const problemFields = [

        body('indEffect[ei1]',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('indEffect.ei2',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('dirEffect.ed1',"campo debe sert tipo texto").isString().trim().notEmpty(),
        body('dirEffect.ed2',"campo debe sert tipo texto").isString().trim().notEmpty(),
        body('dirEffect.ed3',"campo debe sert tipo texto").isString().trim().notEmpty(),
        body('centralProb', "Problema Central no es texto").isString().trim().notEmpty(),
        body('dirCauses.cd1',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('dirCauses.cd2',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('dirCauses.cd3',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('indCauses.ci1',"campo debe ser tipo texto").isString().trim().notEmpty(),
        body('indCauses.ci2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
    ]