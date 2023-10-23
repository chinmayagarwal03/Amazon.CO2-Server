// couponModel.js

import mongoose from 'mongoose';

const carbonMarketSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
        type: String,
      },
    price: {
      type: Number,

    },
    label:{
        type: String,
    },
    location: {
      type: String,

    },
  },
  {
    timestamps: true,
  }
);

const CarbonMarket = mongoose.model('CarbonMarket', carbonMarketSchema);

export default CarbonMarket;
