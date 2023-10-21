import mongoose from 'mongoose'

const sellerSchema = mongoose.Schema(
  {
    sellerId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    carbonRating: {type: Number, required: true},
    about: {type: String, required: false}
  }
)

const seller = mongoose.model('Seller', sellerSchema)

export default seller