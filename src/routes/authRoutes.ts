import express from 'express';
import { authController } from '../controllers/authController';

export const authRoutes = express.Router();

authRoutes.post('/login', authController.login);