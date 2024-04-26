import { validationResult, body } from "express-validator";

export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    const errores = errors.formatWith( error => error.msg)

    if (!errors.isEmpty()) {
        return res.status(410).json({
            message: "Error en el registro de usuario",
            code: 410,
            errors: errores.mapped()
        });
    }

    next()
}

export const userFields = [
    body('fullName', "Coloca tu nombre completo").trim().isString(),
    body('typeDoc', "Coloca tu tipo de documento").trim().isString(),
    body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail(),
    body('faculty', "Colocar la facultad o institución").trim().isString(),
    body('academicProgram', "Colocar la facultad o institución").trim().isString(),
    body('code', "Colocar código de estudiante").trim().isString(),
    body('phone', "Colocar número de teléfono de contacto").trim().isString(),
    body('typeProj', "Colocar el tipo de proyecto").trim().isString(),
    body('instLine', "Colocar la línea de investigación").trim().isString(),
    body('ResearchGroup', "Colocar el grupo de investigación").trim().isString(),
    body('seedLine', "Colocar la línea del semillero de investigación").trim().isString(),
    body('role', "Elija un rol de usuario").trim().isString()
]