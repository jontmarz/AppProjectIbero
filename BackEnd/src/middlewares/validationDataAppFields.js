import { validationResult, body} from "express-validator";

export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
export const problemFields = [
    body('indEffect', "Por favor rellenar los espacios como un objeto {'1':'','2':''}").isObject().notEmpty(),
        body('indEffect[1]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('indEffect[2]',"Debe ser string este campo").isString().trim().notEmpty(),
    body('dirEffect', "Por favor rellenar los espacios como un objeto {'1':'','2':'','3':''}").isObject().notEmpty(),
        body('dirEffect[1]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('dirEffect[2]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('dirEffect[3]',"Debe ser string este campo").isString().trim().notEmpty(),
    body('centralProb', "Coloca tu tipo de documento").trim().isString().notEmpty(),
    body('dircauses', "Por favor rellenar los espacios como un objeto {'1':'','2':'','3':''}").isObject().notEmpty(),
        body('dircauses[1]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('dircauses[2]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('dircauses[3]',"Debe ser string este campo").isString().trim().notEmpty(),
    body('indcauses', "Por favor rellenar los espacios como un objeto {'1':'','2':''}").isObject().notEmpty(),
        body('indcauses[1]',"Debe ser string este campo").isString().trim().notEmpty(),
        body('indcauses[2]',"Debe ser string este campo").isString().trim().notEmpty(),
    validationResExpress
    ]