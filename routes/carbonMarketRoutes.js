import express from 'express'
const router = express.Router()
import {addCarbonMarket, getAllCarbonMarkets} from '../controllers/carbonMarketController.js'
// import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(addCarbonMarket)
router.route('/').get(getAllCarbonMarkets)

export default router 