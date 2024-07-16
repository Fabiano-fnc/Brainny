import { Pool } from 'pg';
import dotenv from 'dotenv';
import Register from '../model/Register';
import User from '../model/User';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Base de dados conectada com sucesso!');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados:', err);
});

export default pool;
