import { Router } from 'express';
import { problemCreate, problemView} from '../controllers/problemController.js';
import { problemFields } from '../middlewares/validationDataAppFields.js';

const router = Router();


router.get('/', problemView)

router.put('/', problemFields, problemCreate)

export default router;
