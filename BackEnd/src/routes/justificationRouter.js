import { Router } from 'express';
import { JustificationCreate, JustificationView } from '../controllers/justificationController.js';
import { JustificationFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', JustificationView)

router.put('/', JustificationFields, JustificationCreate)

export default router;