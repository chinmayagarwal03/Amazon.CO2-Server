// Assuming you have the necessary imports and setup for the route
import express from 'express';
import asyncHandler from 'express-async-handler';
import Seller from '../models/sellerModel.js';


// @desc    Create a new seller
// @route   POST /api/seller
// @access  Private
const createSeller = asyncHandler(async (req, res) => {
    const { name, email, carbonRating , about, rating} = req.body;

    const seller = new Seller({
        name,
        email,
        carbonRating,
        about,
        rating
    });

    const createdSeller = await seller.save();
    res.status(201).json(createdSeller);
});


// @desc    Get all sellers
// @route   GET /api/seller
// @access  PUBLIC
const getAllSellers = asyncHandler(async (req, res) => {
    const sellers = await Seller.find({});
    const sellerId = sellers.map(seller => seller.sellerId);
    const sellerNames = sellers.map(seller => seller.name);
    res.json( sellerNames);
});





// Add the route to the router
export {createSeller, getAllSellers}