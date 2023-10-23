import express from 'express'
const router = express.Router()
import {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, getUserCoupons} from '../controllers/userController.js'
// import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get( getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUser).get( getUserById).patch(updateUser)
router.route('/coupons/:id').get(getUserCoupons)


export default router
 