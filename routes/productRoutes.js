import express from 'express'
const router = express.Router()
import {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts, getProductSellers} from '../controllers/productController.js'
// import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/top').get(getTopProducts)
router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct)
router.route('/:id/reviews').post(createProductReview),
router.route('/:id/sellers').get(getProductSellers)
export default router