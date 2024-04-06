import express from 'express';
import { userControllers } from '../controllers/usercontroller.js';
import { supermarketControllers } from '../controllers/supermarketcontroller.js';
import { photoControllers } from '../controllers/photocontroller.js';

const router = express.Router();


//user picture upload
router.put('/userphotolocal/:id', photoControllers.updateProfilePictureLocal);
router.put('/userphotocloud/:id', photoControllers.updateProfilePictureCloudinary);
router.put('/supermarketphotolocal/:userId/:supermarketId', photoControllers.updateSupermarketPicturesLocal);
router.put('/supermarketphotocloud/:userId/:supermarketId', photoControllers.updateSupermarketPicturesCloudinary);

//user router
router.post('/signup', userControllers.signupUser);
router.post('/signin', userControllers.signinUser);
router.delete('/users/:id', userControllers.deleteUser);
router.get('/users', userControllers.getUsers);
router.get('/users/:id', userControllers.getUser);
router.put('/users/:id', userControllers.updateUser);

//supermarket router
router.post('/addsupermarket/:id', supermarketControllers.createSupermarket);
router.get('/supermarkets', supermarketControllers.getSupermarkets);
router.get('/supermarkets/:id', supermarketControllers.getSupermarket);
router.put('/supermarkets/:id', supermarketControllers.updateSupermarket);
router.delete('/supermarkets/:id', supermarketControllers.deleteSupermarket);

// // Assuming your route is defined like this
// app.post('/supermarkets/:userId/:supermarketId/pictures', photoControllers.updateSupermarketPicturesLocal);



export default router;