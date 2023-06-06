import { Router } from 'express';
import { problemCreate } from '../controller/problemController.js';
import { problemFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', )

router.post('/', problemFields, problemCreate)

export default router;
