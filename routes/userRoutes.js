import express from 'express'
const router = express.Router()
import {authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userController.js'
// import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get( getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUser).get( getUserById).put(updateUser)

export default router
 