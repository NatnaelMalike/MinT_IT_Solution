import express from "express"
import getProfile from "../controllers/profileController.js"
import authorization from "../middleware/authorization.js"

const router = express.Router()
router.use(authorization)
router.get('/', getProfile)

export default router