// routes/index.js
import express from 'express';
const router = express.Router();

// import { home } from '../controllers/homeController';
import { createUser } from '../controllers/userController.js';

router.post('/user', createUser);

export default router;




// // routes/index.js
// import express from 'express';
// const router = express.Router();


// import { createUser } from '../controllers/userController';

// router.get('/', home);
// router.get('/user', createUser);

// export default router;
