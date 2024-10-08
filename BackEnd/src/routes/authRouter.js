import { Router } from 'express';
const router = Router();
import { signup, login, logout, deleteUser } from '../controllers/authController.js';
import { signupValidatorFields, logInValidatorFields } from '../middlewares/validationFields.js';

// CREACION DEL USUARIO (SING-UP)
router.post ('/register', signupValidatorFields, signup);
// INGRSO DEL USUARIO (LOGIN)
router.post ('/login',logInValidatorFields, login);
// ELIMINAR USUARIO
router.delete('/users/:id', deleteUser);
// CERRADO DE SESION (LOGOUT)
router.get("/logout", logout)


export default router;
