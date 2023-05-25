import { Router } from 'express';
const router = Router();
import {signup, login, logout} from '../controller/authController.js';


// CREACION DEL USUARIO (SING-UP)
router.post ('/register', signup);
// INGRSO DEL USUARIO (LOGIN)
router.post ('/login', login);
// CERRADO DE SESION (LOGOUT)
router.get("/logout", logout)

export default router;
