import { Router } from 'express';
import { infoUser } from '../controller/userController.js';

const router = Router();

router.get('/info1', infoUser)

export default router;
