import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel.js'
import User from '../models/userModel.js'

// @desc    Create new coupon
// @route   POST /api/coupons
// @access  Private
const createCoupon = asyncHandler(async (req, res) => {
    const { title, image, name, pointsRequired, discount } = req.body;
  
    const coupon = await Coupon.create({
      title,
      image,
      name,
      pointsRequired,
      discount,
    });
  
    if (coupon) {
      res.status(201).json({
        _id: coupon._id,
        title: coupon.title,
        image: coupon.image,
        name: coupon.name,
        pointsRequired: coupon.pointsRequired,
        discount: coupon.discount,
      });
    } else {
      res.status(400);
      throw new Error('Invalid coupon data');
    }
  });

// @desc    Get all coupons
// @route   Get /api/coupons
// @access  Public
const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
});  
  
// @desc    Buy coupon with carbon points
// @route   POST /api/coupons/buy
// @access  Private
const buyCouponWithPoints = asyncHandler(async (req, res) => {
  const { couponId } = req.body; 
  const user = await User.findById(req.user._id); 

  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  if (user.carbonPoints < coupon.pointsRequired) {
    res.status(400);
    throw new Error('Not enough carbon points to buy the coupon');
  }

  user.carbonPoints -= coupon.pointsRequired;

  user.coupons.push(coupon);

  await user.save();

  res.json({ message: 'Coupon purchased successfully' });
});

export {createCoupon, getCoupons, buyCouponWithPoints}