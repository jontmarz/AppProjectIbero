import { Router } from 'express';
import { dataUsers, infoUser, editUser, dataUser, editUserAdmin } from '../controllers/userController.js';
import { userFields } from '../middlewares/validationFields.js';

const router = Router();

router.get('/dataUser', infoUser)
router.get('/', dataUsers)
router.get('/:idUser', dataUser)
router.put('/', userFields, editUser)
router.put('/:idUser', userFields, editUserAdmin)

export default router;
