import asyncHandler from 'express-async-handler'
import CarbonMarket from '../models/carbonMarketModel.js'

// @desc    Create new carbon market
// @route   POST /api/carbonMarkets
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

// @desc    Get carbon markets
// @route   POST /api/carbonMarkets
// @access  Public
const getAllCarbonMarkets = asyncHandler(async (req, res) => {
  const carbonMarkets = await CarbonMarket.find({});
  res.json(carbonMarkets);
});
export {addCarbonMarket, getAllCarbonMarkets}