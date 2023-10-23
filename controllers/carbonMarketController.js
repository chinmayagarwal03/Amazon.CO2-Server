import asyncHandler from 'express-async-handler'
import CarbonMarket from '../models/carbonMarketModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addCarbonMarket = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    price,
    label,
    location,
  } = req.body;
  const carbonMarket = new CarbonMarket({
    image,
    title,
    price,
    label,
    location,
  });

  const createdCarbonMarket = await carbonMarket.save();
  res.status(201).json(createdCarbonMarket);
});


export {addCarbonMarket}