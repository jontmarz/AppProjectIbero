import { Router } from 'express';
import { infoUser } from '../controller/userController.js';

const router = Router();

router.get('/', infoUser)

export default router;
