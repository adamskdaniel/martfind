// Import the mongoose library
import mongoose from 'mongoose';

// Define the user schema using the mongoose.Schema class
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  gender: { type: String },
  photo: { type: String },
  phoneNo: { type: String },
  userVerification: { type: Boolean, default: false },
  userSupermarket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'supermarket' }],
});

// Create a mongoose model named 'User' based on the defined user schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other parts of the application
export default User;




// // Import the mongoose library
// import mongoose from 'mongoose';

// // Define the user schema using the mongoose.Schema class
// const userSchema = new mongoose.Schema({
//   // Define the properties of the user model with their respective types and validation requirements
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true  },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
//   gender: { type: String },
//   photo: { type: String },
//   phoneNo: { type: String },
//   userVerification: { type: Boolean, default: false },
//   // Define a reference to the 'supermarket' model using its ObjectId
//   userSupermarket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'supermarket' }],
// });

// // Create a mongoose model named 'User' based on the defined user schema
// const User = mongoose.model('User', userSchema);

// // Export the User model to be used in other parts of the application
// export default User;


