import { Router } from 'express';
import { goalView, goalCreate } from '../controller/goalController.js';
import { goalFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', goalView)

router.put('/', goalFields, goalCreate)

export default router;