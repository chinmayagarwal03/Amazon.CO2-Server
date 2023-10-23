import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel.js'

// @desc    Create new order
// @route   POST /api/orders
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

  const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
  });
  
  // Existing functions
  
  
// @desc    Buy coupon with carbon points
// @route   POST /api/coupons/buy
// @access  Private
const buyCouponWithPoints = asyncHandler(async (req, res) => {
  const { couponId } = req.body; // Assuming you receive the coupon ID in the request body
  const user = await User.findById(req.user._id); // Assuming the authenticated user's ID is used

  // Find the coupon by ID
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  // Check if the user has enough carbon points to buy the coupon
  if (user.carbonPoints < coupon.pointsRequired) {
    res.status(400);
    throw new Error('Not enough carbon points to buy the coupon');
  }

  // Deduct the points from the user's account
  user.carbonPoints -= coupon.pointsRequired;

  // Add the coupon to the user's purchased coupons list
  user.coupons.push(coupon);

  // Save the updated user data
  await user.save();

  res.json({ message: 'Coupon purchased successfully' });
});

export {createCoupon, getCoupons, buyCouponWithPoints}