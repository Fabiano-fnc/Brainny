import { Request, Response } from 'express';
import User from '../model/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, senha, role } = req.body;

  try {
    const newUser = await User.create({ name, email, senha, role });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};
