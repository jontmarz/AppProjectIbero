import { validationResult, body} from "express-validator";


export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const signupValidatorFields = [
    body('fullName', "Coloca tu nombre completo").trim().isString().notEmpty(),
    body('typeDoc', "Coloca tu tipo de documento").trim().isString().notEmpty(),
    body('identify', "Coloca tu documento").trim().notEmpty(),
    body('emailI', "Coloca un correo institucional valido").trim().isEmail().normalizeEmail().notEmpty(),
    body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail().notEmpty(),
    body('faculty', "colocar la facultad o institución").trim().isString().notEmpty(),
    body('academicProgram', "colocar la facultad o institución").trim().isString().notEmpty(),
    body('password', "Mínino 8 caracteres").trim().isLength({min: 8}),
    body('password')
      .custom((e, {req}) => {
        if (e !== req.body.repassword) {
          throw new Error('Las contraseñas no coinciden')
        }
        return e
      }
    ),
    validationResExpress
  ]

  export const logInValidatorFields = [
    body('identify', "colocar la facultad o institución").trim().notEmpty(),
    validationResExpress
  ]