import { validationResult, body} from "express-validator";
import { Users } from "../models/Users.js";


export const validationResExpress = (req, res, next) => {
    const errors = validationResult(req);
    const errores = errors.formatWith( error => error.msg )

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
    body('fullName', "Coloca tu nombre completo").trim().isString().notEmpty(), // Nombre completo
    body('typeDoc', "Coloca tu tipo de identificación").trim().isString().notEmpty(), // Tipo de identificación
    body('identify', "Coloca tu identificación")
      .trim()
      .notEmpty()
      .custom(async(value) => {
        let user =  await Users.findOne({ identify: value })
        if (user) return Promise.reject('Esta identificación ya esta registrada');

      }), // Identificación
    body('emailI', "Coloca un correo institucional valido")
      .trim()
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .custom(async(value) => {
        let email = await Users.findOne({ email: value })
        if (email) return Promise.reject('Este correo institucional ya esta registrado')
           
      })
      .matches(/^[a-zA-Z0-9._%+-]+@(ibero\.edu\.co|docente\.ibero\.edu\.co|estudiante\.ibero\.edu\.co)$/)
      .withMessage("El correo debe ser de los dominios ibero.edu.co o docentes.ibero.edu.co o estudiantes.ibero.edu.co")
      .isEmail().normalizeEmail().notEmpty(), // Correo institucional
    /* body('emailI', "Coloca un correo institucional valido").trim().custom(async(value) => {
      let email = await Users.findOne({ email: value })
      
      if (email) {
        return Promise.reject('Este correo institucional ya esta registrado')
      }        
    }).isEmail().normalizeEmail().notEmpty(), // Correo institucional */
    body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail().notEmpty(), // Correo personal
    body('faculty', "Colocar la facultad o institución").trim().isString().notEmpty(), // Facultad
    body('role', "Colocar el rol de usuario").trim().isString().notEmpty(), // rol
    body('password', "Mínino 8 caracteres").trim().isLength({min: 8}),
    body('password')
      .custom((e, {req}) => {
        if (e !== req.body.repassword) {
          throw new Error('Las contraseñas no coinciden')
        }
        return e
      }
    ), // Contraseña
    body('projects').optional().isArray().withMessage("Si se proporciona, debe ser un array de proyectos"),
    validationResExpress
  ]

export const logInValidatorFields = [
  body('emailI', "Correo no valido").isEmail().normalizeEmail().notEmpty(),
  body('password', "colocar la contraseña").trim(),
  validationResExpress
] 

export const userFields = [
  body('fullName', "Coloca tu nombre completo").trim().isString(),
  body('typeDoc', "Coloca tu tipo de documento").trim().isString(),
  body('emailP', "Coloca un correo personal valido").trim().isEmail().normalizeEmail(),
  body('faculty', "Colocar la facultad o institución").trim().isString(),
  body('academicProgram', "Colocar la facultad o institución").trim().isString(),
  body('code', "Colocar código de estudiante").trim().isNumeric(),
  body('phone', "Colocar número de teléfono de contacto").trim().isNumeric(),
  body('typeProj', "Colocar el tipo de proyecto").trim().isString(),
  body('instLine', "Colocar la línea de investigación").trim().isString(),
  body('ResearchGroup', "Colocar el grupo de investigación").trim().isString(),
  body('seedLine', "Colocar la línea del semillero de investigación").trim().isString(),
  body('role', "Elija un rol de usuario").trim().isString(),
  body('projects', "Colocar los proyectos en los que participa").optional().isArray()
]