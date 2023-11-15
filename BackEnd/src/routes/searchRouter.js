import { Router } from 'express';
import { searchdata } from '../controller/searchController.js';

const router = Router();

router.get('/', searchdata)

export default router;