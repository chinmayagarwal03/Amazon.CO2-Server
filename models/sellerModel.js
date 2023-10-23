import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  carbonRating: { type: Number, required: true },
  rating: { type: Number, required: true },
  about: { type: String, required: false },
});

const seller = mongoose.model('Seller', sellerSchema);

export default seller;
