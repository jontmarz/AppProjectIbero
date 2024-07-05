import { Router } from 'express';
import { dataUsers, infoUser, editUser, dataUser, editUserAdmin, getTutorData, updateTutor } from '../controllers/userController.js';
import { userFields } from '../middlewares/validationFields.js';
import { TutorFields } from '../middlewares/validationDataAppFields.js';

const router = Router();

router.get('/dataUser', infoUser)
router.get('/', dataUsers)
router.get('/:idUser', dataUser)
router.get('/tutor/:tutorId', getTutorData)
router.put('/', userFields, editUser)
router.put('/:idUser', userFields, editUserAdmin)
router.put('/tutor', TutorFields, updateTutor);

export default router;
