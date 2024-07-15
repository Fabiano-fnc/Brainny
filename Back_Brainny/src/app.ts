import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './routes/api';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Configuração do CORS
app.use(cors());

// Configuração do caminho estático para os arquivos no diretório 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Adicionar suporte para JSON

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;
