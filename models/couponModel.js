// couponModel.js

import mongoose from 'mongoose';

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pointsRequired: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
