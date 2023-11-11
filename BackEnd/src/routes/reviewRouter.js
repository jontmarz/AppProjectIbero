import { Router } from "express";
import { reviewViews, reviewCreate } from "../controller/ReviewController.js";
import { reviewFields } from "../middlewares/validationDataAppFields.js";

const router = Router();

router.get('/i', reviewViews)
router.put('/:idProject', reviewFields, reviewCreate)

export default router;