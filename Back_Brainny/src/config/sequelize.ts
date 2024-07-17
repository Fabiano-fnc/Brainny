import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Register from '../model/Register';
import User from '../model/User';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  timezone: '-03:00',
});

export default sequelize;

