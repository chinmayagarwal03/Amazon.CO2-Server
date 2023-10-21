import express from 'express'
const router = express.Router()
import {addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid} from '../controllers/orderController.js'
// import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/:id').post(addOrderItems).get( getOrders)
router.route('/:id/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').patch(updateOrderToPaid)
router.route('/:id/deliver').patch(updateOrderToDelivered)

export default router 