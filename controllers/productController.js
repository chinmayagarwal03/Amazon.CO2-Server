import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel.js';
import Product from '../models/productModel.js'
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js'
// @desc    Fetch all products
// @route   GET /api/products
// @acess   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // Fetch all products

  if (products) {
    res.json(products); // Return all products
  } else {
    res.status(404).json({ message: 'No products found' });
  }
});

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @acess   Public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    if (!product.sellers || product.sellers.length === 0) {
      return res.json({ message: 'No sellers found for this product' });
    }
   

    const sellers = [];
    for (const sellerItem of product.sellers) {
      const foundSeller = await Seller.findOne({ sellerId: sellerItem.sellerId });
      if (foundSeller) {
        sellers.push({
          sellerId: foundSeller.sellerId,
          name: foundSeller.name,
          email: foundSeller.email,
          carbonRating: foundSeller.carbonRating,
          about: foundSeller.about
        });
      }
    }

    res.json({product, sellers: sellers})

    

})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @acess   Private/Admin
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove();
        res.json({message: 'Product Removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
    res.json(product)
})

// @desc    Create a product
// @route   POST /api/products
// @acess   Private/Admin
const createProduct = asyncHandler(async (req,res) => {
    const { productId, name, image, category, countInStock, numReviews, description, sellers } = req.body;
    const product = new Product({
        productId,
        name: name,
        image: image,
        category: category,
        description: description ,
        sellers: sellers || [], // Assuming sellers array is provided in the request body
        // user: req.user._id,
        countInStock: countInStock || 0,
        numReviews: numReviews || 0,
       
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


const updateProduct = asyncHandler(async (req,res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body


    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name,
        product.price[0].price = price;
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})



const createProductReview = asyncHandler(async (req,res) => {
    const {
        rating,
        comment
    } = req.body


    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            rating: Number(rating),
            comment,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({ message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// productController.js

const createCoupon = asyncHandler(async (req, res) => {
    const { name, pointsRequired, discount } = req.body;
  
    const coupon = await Coupon.create({
      name,
      pointsRequired,
      discount,
    });
  
    if (coupon) {
      res.status(201).json({
        _id: coupon._id,
        name: coupon.name,
        pointsRequired: coupon.pointsRequired,
        discount: coupon.discount,
      });
    } else {
      res.status(400);
      throw new Error('Invalid coupon data');
    }
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

// @desc    Get information about sellers assigned to a product by productId
// @route   GET /api/products/:productId/sellers
// @access  Public (Modify the access level as needed)
// const getProductSellers = asyncHandler(async (req, res) => {
//     const { productId } = req.params;
//     const product = await Product.find({ productId });
  
//     if (!product) {
//       res.status(404);
//       throw new Error('Product not found');
//     } else {
//       const sellers = product.sellers;
//       res.json(sellers);
//     }
//   });
const getProductSellers = asyncHandler(async (req, res) => {
  const { id } = req.params; 

  console.log(id);
  
    const product = await Product.findOne({ productId: id }); 
     console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
  
    if (!product.sellers || product.sellers.length === 0) {
      return res.json({ message: 'No sellers found for this product' }); 
    }
  
    const sellers = [];
    for (const sellerItem of product.sellers) {
      const foundSeller = await Seller.findOne({ sellerId: sellerItem.sellerId });
      if (foundSeller) {
        sellers.push({
          sellerId: foundSeller.sellerId,
          name: foundSeller.name,
          email: foundSeller.email,
          carbonRating: foundSeller.carbonRating,
          about: foundSeller.about
        });
      }
    }
  
    res.json(sellers);
});
  
  
  
const getTopProducts = asyncHandler(async (req,res) => {
   const products = await Product.find({}).sort({reviews: -1}).limit(3);
   res.json(products)
})
export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    createCoupon,
    buyCouponWithPoints ,
    getProductSellers
}