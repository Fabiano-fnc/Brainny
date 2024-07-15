import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // desabilitar logging SQL no console
  timezone: '-03:00', // Define o fuso horário para Brasil
});

export default sequelize;
