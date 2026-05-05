import express from 'express'
import {registerUser, login, meController, logout} from './auth.controller.js'
import { authMiddleware } from './auth.middleware.js';

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/me', authMiddleware, meController);

export default router
