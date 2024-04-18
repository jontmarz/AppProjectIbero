import { Router } from 'express';
import { ethicalImpactsCreate, ethicalImpactsView } from '../controllers/ethicalImpactsController.js';
import { ethicalImpactsFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', ethicalImpactsView)

router.put('/', ethicalImpactsFields, ethicalImpactsCreate)

export default router;