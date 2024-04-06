// Import the mongoose library
import mongoose from 'mongoose';

// Define the user schema using the mongoose.Schema class
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  temporaryToken: {type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  gender: { type: String },
  profilePicture: { type: String },
  phoneNo: { type: String },
  userVerification: { type: Boolean, default: false },
  userSupermarket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'supermarket' }],
});

// Create a mongoose model named 'User' based on the defined user schema
export const userModel = mongoose.model('User', userSchema);
