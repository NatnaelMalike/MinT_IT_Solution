import express from 'express'
import { getVisitors } from '../controllers/visitorsController.js'
const router = express.Router()

router.get('/', getVisitors)

export default router