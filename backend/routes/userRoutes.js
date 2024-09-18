import express from 'express';
import { getMyProfile, loginUser, logoutUser, registerUser } from '../controller/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getMyProfile);
router.get('/logout', isAuth, logoutUser);

export default router;