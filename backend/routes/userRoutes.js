import express from 'express';
import { getMyProfile, loginUser, logoutUser, registerUser, saveToPlaylist } from '../controller/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getMyProfile);
router.get('/logout', isAuth, logoutUser);
router.post('/podcast/:id', isAuth, saveToPlaylist);

export default router;