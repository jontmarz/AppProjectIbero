import { Router } from "express"
import { settingAppView, settingAppCreate } from "../controllers/settingAppController.js"
import { settingsAppFields } from "../middlewares/validationDataAppFields.js"

const router = Router()

router.get("/", settingAppView)
router.put("/", settingsAppFields, settingAppCreate)

export default router;