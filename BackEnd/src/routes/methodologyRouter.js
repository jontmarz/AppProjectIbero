import { Router } from 'express';
import { methodologyView, methodologyCreate } from '../controllers/methodologyController.js';
import { methodologyFields } from '../middlewares/validationDataAppFields.js';

const router = Router();

router.get('/', methodologyView)
router.put('/', methodologyFields, methodologyCreate)

export default router;