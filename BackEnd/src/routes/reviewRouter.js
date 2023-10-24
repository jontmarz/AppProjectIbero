import { Router } from "express";
import { reviewView, reviewCreate } from "../controller/ReviewController.js";
import { reviewFields } from "../middlewares/validationDataAppFields.js";

const router = Router();

router.get('/', reviewView)

router.put('/', reviewFields, reviewCreate)

export default router;