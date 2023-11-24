import { Router } from 'express';
import { recordCreate, recordView } from '../controllers/recordController.js';
import { recordsFields } from '../middlewares/validationDataAppFields.js';

const router = Router();

router.get('/', recordView);

router.put('/', recordsFields, recordCreate);

export default router;