import { validationResult, body} from "express-validator";
import { Users } from "../models/Users.js";


export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    const errores = errors.formatWith( error => error.msg)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Error en el registro de usuario",
            code: 0,
            errors: errores.mapped()
        });
    }

    next()
}

export const signupValidatorFields = [
    body('fullName', "Coloca tu nombre completo").trim().isString().notEmpty(),
    body('typeDoc', "Coloca tu tipo de documento").trim().isString().notEmpty(),
    body('identify', "Coloca tu documento").trim().notEmpty(),
    body('emailI', "Coloca un correo institucional valido").trim().custom(async(value) => {
      return Users.findOne({ where: {emailI: value} })
        .then(() => {
            return Promise.reject('Este correo ya esta registrado')
        })
    }).isEmail().normalizeEmail().notEmpty(),
    body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail().notEmpty(),
    body('faculty', "Colocar la facultad o institución").trim().isString().notEmpty(),
    body('academicProgram', "Colocar la facultad o institución").trim().isString().notEmpty(),
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