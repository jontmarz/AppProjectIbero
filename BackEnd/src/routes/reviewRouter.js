import { Router } from "express";
import { reviewViews, reviewCreate } from "../controller/ReviewController.js";
import { reviewFields } from "../middlewares/validationDataAppFields.js";

const router = Router();

<<<<<<< HEAD
router.get('/i', reviewViews)
router.put('/:idProject', reviewFields, reviewCreate)
=======
router.get('/', reviewView)

router.put('/', reviewFields, reviewCreate)
>>>>>>> parent of 092d66e (reviews docente)

export default router;