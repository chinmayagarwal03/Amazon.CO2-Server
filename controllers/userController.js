import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user and get token
// @route   POST /api/user/login
// @acess   Public
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.email,
            email: user.email,
            isAdmin: user.isAdmin,
            carbonPoints: user.carbonPoints,
            carbon_credits: user.carbon_credits,
            coupons: user.coupons,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email address or password')
    }
})

// // @desc    Register a new user
// // @route   POST /api/user
// // @acess   Private
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(400);
        throw new Error('user already exists')
    }

    const user = new User({
        name,
        email,
        password
    })
    
    await user.save()
    
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    get user profile
// @route   GET /api/user/profile
// @acess   Private
const getUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)

    if(user ){
        res.json({
            _id: user._id,
            name: user.email,
            email: user.email,
            carbonPoints: user.carbonPoints,
            carbon_credits: user.carbon_credits,
            coupons: user.coupons,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PATCH /api/user/profile
// @acess   Private
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user ){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    get all users
// @route   GET /api/user
// @acess   Private
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    get user by id
// @route   GET /api/user/:id
// @acess   Private/Admin
const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-password')
    res.json(user)
})

// @desc    Update user
// @route   PUT /api/user/:id
// @acess   Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
    const { carbonPoints, coupons, carbon_credits } = req.body;
  
    const user = await User.findById(id);
  
    if (user) {
      if (carbonPoints) {
        user.carbonPoints = carbonPoints;
      }
      if (coupons) {
        user.coupons.push(coupons);
      }

      if(carbon_credits)
      {
        user.carbon_credits = carbon_credits;
      }

  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        carbonPoints: updatedUser.carbonPoints,
        carbon_credits: updatedUser.carbon_credits,
        coupons: updatedUser.coupons,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
    }catch {
        next(error);
    }
    
  });


// @desc    User's Coupons
// @route   GET /api/user/coupons/:id
// @acess   Public
  const getUserCoupons = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const user = await User.findById(id).populate('coupons').exec();
    console.log(user)
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    const coupons = user.coupons;
    res.json(coupons);
  });


// @desc    Delete user
// @route   DELETE /api/users/:id
// @acess   Private
const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.json(user)
})
export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, getUserCoupons}