import { validationResult, body} from "express-validator";

export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    const errores = errors.formatWith( error => error.msg)
    if (!errors.isEmpty()) {
        return res.status(410).json({
            message: "Error en algun campo del formulario",
            code: 410,
            errors: errores.mapped()
        });
    }
    next()
}
export const problemFields = [
    body('tree.indEffect.ei1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indEffect.ei2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirEffect.ed3',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.centralProb', "Problema Central no es texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.dirCauses.cd3',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indCauses.ci1',"campo debe ser tipo texto").isString().trim().notEmpty(),
    body('tree.indCauses.ci2',"campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const descriptionFields = [
    body('desText', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const goalFields = [
    body('goals.objEspe.oe1', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('goals.objEspe.oe2', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('goals.objEspe.oe3', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('goals.objEspe.oe4', "campo debe ser tipo texto").optional().isString().trim(),
    body('goals.objGen', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('goals.titleProj', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const recordsFields = [
    body('records', "records no existe como objeto").isObject().notEmpty(),
    body('records[*].AutorRecord', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('records[*].LinkRecord', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('records[*].NumberQuotes', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('records[*].ResearchContribute', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('records[*].ResumeRecord', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('records[*].id', "campo debe ser tipo numero").isNumeric().isLength({min:1, max:5}).notEmpty(),
    body('records[*].TitleRecord', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]