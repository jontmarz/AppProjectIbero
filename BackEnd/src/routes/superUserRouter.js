import { Router } from 'express';
import { middlewareToken } from '../middlewares/middlewareToken.js';
import { getUsers, getData, addProjects } from '../controllers/superUserController.js';

const router = Router();

router.get('/users', middlewareToken, getUsers)
router.get('/dataApp', middlewareToken, getData)
router.put('/users/:id', middlewareToken, addProjects)

export default router;