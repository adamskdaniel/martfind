// Import the mongoose library
import mongoose from 'mongoose';

// Define the supermarket schema using the mongoose.Schema class
const supermarketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the supermarket
  location: { type: String, required: true },
  description: { type: String },
  openingHours: { type: String }, // Assuming opening hours are provided as a string
  contactNumber: { type: String },
  whatsappNumber: { type: String }, 
  website: { type: String }, // Assuming website URL is provided as a string
  supermarketPictures: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], 
  
});

// Create a mongoose model named 'Supermarket' based on the defined supermarket schema
export const supermarketModel = mongoose.model('Supermarket', supermarketSchema);