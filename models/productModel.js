import mongoose, { Schema } from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  {
    timestamps: false,
  }
)

const productSchema = mongoose.Schema(
{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    carbon_rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    sellers: [
      {
        sellerId: {
          type: Schema.ObjectId,
          ref: 'Seller',
          required: true
        },
        price: {
          type: Number,
          required: true,
        },
        mrp: {
          type: Number, 
          required: true,
        },
        carbon_points: {
          type: Number,
          required: true,
        },
      },
    ],
    

    countInStock: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product