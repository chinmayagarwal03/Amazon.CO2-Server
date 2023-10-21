import express from 'express';
import {createSeller, getAllSellers} from '../controllers/sellerController.js'
const router = express.Router();

router.post('/', createSeller);
router.get('/', getAllSellers);
export default router;