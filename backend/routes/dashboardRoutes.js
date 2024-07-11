import express from "express"
import authorization from "../middleware/authorization.js"
import { getDashboardData } from "../controllers/dashboardController.js"

const router = express.Router()
router.use(authorization)
router.get('/', getDashboardData)

export default router   