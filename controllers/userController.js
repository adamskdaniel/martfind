// Import your user schema
import User from '../models/userModel.js';

const isStrongPassword = (password) => {
  // Password must have at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Check if the password meets the criteria
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error:
          'Password must have at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long',
      });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createUser };





// // Import your user schema
// import User from '../models/userModel';

// const isStrongPassword = (password) => {
//   // Password must have at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long
//   const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return strongPasswordRegex.test(password);
// };

// const createUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate input data
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email is already registered' });
//     }

//     // Check if the password meets the criteria
//     if (!isStrongPassword(password)) {
//       return res.status(400).json({
//         error:
//           'Password must have at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long',
//       });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export { createUser };



