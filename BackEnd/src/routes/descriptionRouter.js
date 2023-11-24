import { Router } from 'express';
import { DescriptionCreate, DescriptionView } from '../controllers/descriptionController.js';
import { descriptionFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', DescriptionView)

router.put('/', descriptionFields, DescriptionCreate)

export default router;