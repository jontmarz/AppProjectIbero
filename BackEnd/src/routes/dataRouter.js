import { Router } from 'express';
import { dataView } from '../controller/dataController.js';

const router = Router();

router.get('/', dataView);

export default router;