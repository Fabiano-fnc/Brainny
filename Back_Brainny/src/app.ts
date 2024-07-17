import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './routes/api';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
