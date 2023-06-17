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
    body('tree.indEffect.ei1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indEffect.ei2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed1',"campo debe sert tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed2',"campo debe sert tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed3',"campo debe sert tipo texto").isString().trim().notEmpty(),
    body('tree.centralProb', "Problema Central no es texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd3',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indCauses.ci1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indCauses.ci2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]