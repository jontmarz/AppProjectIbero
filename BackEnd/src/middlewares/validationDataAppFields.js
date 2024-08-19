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

export const ethicalImpactsFields = [
    body('ethicals', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('impacts', "campo debe ser tipo texto").isString().trim().notEmpty(),
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

export const reviewFields = [
    body('comment', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('state', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const JustificationFields = [
    body('justification', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const methodologyFields = [
    body('methodology.summary', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.approachResearch', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.scopeResearch', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.designResearch', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.techSPickupInfo', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.explainGoals.eg1', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.explainGoals.eg2', "campo debe ser tipo texto").isString().trim().notEmpty(),
    body('methodology.explainGoals.eg3', "campo debe ser tipo texto").isString().trim().notEmpty(),
    validationResExpress
]

export const settingsAppFields = [
    body('faculties').isArray().withMessage('El campo "faculties" debe ser un array').notEmpty().withMessage('El campo "faculties" no puede estar vacío'),
    body('faculties.*.name', "El campo 'name' de 'faculties' debe ser un texto").isString().trim().notEmpty(),
    body('faculties.*.academicPrograms').isArray().withMessage('El campo "academicPrograms" de "faculties" debe ser un array').notEmpty().withMessage('El campo "academicPrograms" de "faculties" no puede estar vacío'),
    body('faculties.*.academicPrograms.*', "El campo 'academicPrograms' debe ser un texto").isString().trim().notEmpty(),
    body('projectTypes').isArray().withMessage('El campo "projectTypes" debe ser un array').notEmpty().withMessage('El campo "projectTypes" no puede estar vacío'),
    body('projectTypes.*', "El campo 'projectTypes' debe ser un texto").isString().trim().notEmpty(),
    body('researchLines').isArray().withMessage('El campo "researchLines" debe ser un array'),
    body('researchLines.*', "El campo 'researchLines' debe ser un texto").isString().trim().notEmpty(),
    body('researchGroups').isArray().withMessage('El campo "researchGroups" debe ser un array'),
    body('researchGroups.*', "El campo 'researchGroups' debe ser un texto").isString().trim().notEmpty(),
    body('seedLine').isArray().withMessage('El campo "seedLine" debe ser un array'),
    body('seedLine.*', "El campo 'seedLine' debe ser un texto").isString().trim().notEmpty(),
    validationResExpress
]
