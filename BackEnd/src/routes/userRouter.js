import { Router } from 'express';
import { dataUsers, infoUser, editUser, dataUser } from '../controllers/userController.js';

const router = Router();

router.get('/dataUser/', infoUser)
router.get('/', dataUsers)
router.get('/:idUser', dataUser)
router.put('/', editUser)

export default router;
