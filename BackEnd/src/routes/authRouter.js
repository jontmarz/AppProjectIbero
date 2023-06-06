import { Router } from 'express';
const router = Router();
import {signup, login, logout} from '../controller/authController.js';
import { signupValidatorFields, logInValidatorFields } from '../middlewares/validationFields.js';

// CREACION DEL USUARIO (SING-UP)
router.post ('/register', signupValidatorFields, signup);
// INGRSO DEL USUARIO (LOGIN)
router.post ('/login',logInValidatorFields, login);
// CERRADO DE SESION (LOGOUT)
router.get("/logout", logout)


export default router;
