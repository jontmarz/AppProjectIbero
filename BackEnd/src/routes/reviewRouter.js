import { Router } from "express";
import { reviewViews, reviewCreate } from "../controller/ReviewController.js";
import { reviewFields } from "../middlewares/validationDataAppFields.js";

const router = Router();

router.get('/data', reviewViews)
router.put('/:idProject', reviewFields, reviewCreate)

export default router;