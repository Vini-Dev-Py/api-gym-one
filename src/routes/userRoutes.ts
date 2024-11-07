import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { userController } from '../controllers/userController';

export const userRoutes = express.Router();
export const userRoutesCreate = express.Router();

userRoutesCreate.post('/users/', userController.createUser);

userRoutes.use(authMiddleware);
userRoutes.get('/users/', userController.getAllUsers);
userRoutes.get('/users/:id', userController.getUserById);
userRoutes.put('/users/:id', userController.updateUser);
userRoutes.delete('/users/:id', userController.deleteUser);
