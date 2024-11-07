import express from "express";
import cors from 'cors';
import { authRoutes } from "./routes/authRoutes";
import { userRoutes, userRoutesCreate } from "./routes/userRoutes";
import { announcementRoutes } from "./routes/professionalRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigin = 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use(authRoutes);
app.use(userRoutesCreate);
app.use(userRoutes);
app.use(announcementRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
