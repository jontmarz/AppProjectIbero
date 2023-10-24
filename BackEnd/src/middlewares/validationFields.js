import { validationResult, body} from "express-validator";
import { Users } from "../models/Users.js";


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

export const signupValidatorFields = [
    body('fullName', "Coloca tu nombre completo").trim().isString().notEmpty(),
    body('typeDoc', "Coloca tu tipo de documento").trim().isString().notEmpty(),
    body('identify', "Coloca tu documento").trim().notEmpty().custom(async(value) => {

      let user =  await Users.findOne({ identify: value })    

      if (user) {
        return Promise.reject('Este Documento ya esta registrado');
      }
    }),
    body('emailI', "Coloca un correo institucional valido").trim().custom(async(value) => {
      let email = await Users.findOne({ emailI: value })
      
      if (email) {
        return Promise.reject('Este correo ya esta registrado')
      }        
    }).isEmail().normalizeEmail().notEmpty(),
    body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail().notEmpty(),
    body('faculty', "Colocar la facultad o institución").trim().isString().notEmpty(),
    body('academicProgram', "Colocar la facultad o institución").trim().isString().notEmpty(),
    body('role', "Elija un rol de usuario").trim().isString().isEmpty(),
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
  body('emailI', "Correo no valido").isEmail().normalizeEmail().notEmpty(),
  body('password', "colocar la contraseña").trim(),
  validationResExpress
] 