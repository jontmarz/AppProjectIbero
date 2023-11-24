import { Router } from 'express';
import { searchdata } from '../controllers/searchController.js';

const router = Router();

router.get('/', searchdata)

export default router;