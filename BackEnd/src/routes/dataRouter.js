import { Router } from 'express';
import { dataViews, dataView, profdataView } from '../controller/dataController.js';


const router = Router();

router.get('/', dataViews);
router.get('/dataProject', dataView);
router.get('/:idProj', profdataView);

export default router;