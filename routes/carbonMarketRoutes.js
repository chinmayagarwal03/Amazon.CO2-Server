import express from 'express'
const router = express.Router()
import {addCarbonMarket} from '../controllers/carbonMarketController.js'
// import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(addCarbonMarket)

export default router 