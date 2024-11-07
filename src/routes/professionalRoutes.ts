import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { announcementController } from '../controllers/announcementController';

export const announcementRoutes = express.Router();

announcementRoutes.use(authMiddleware);
announcementRoutes.get('/announcement/', announcementController.getAllAnnouncements);
announcementRoutes.get('/announcement/:id', announcementController.getAnnouncementById);
announcementRoutes.post('/announcement/', announcementController.createAnnouncement);