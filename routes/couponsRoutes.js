import express from 'express'
const router = express.Router()
import {createCoupon, getCoupons, buyCouponWithPoints} from '../controllers/couponsController.js'

router.route('/').get(getCoupons),
router.route('/').post(createCoupon),
router.route('//buy').post(buyCouponWithPoints)

export default router 