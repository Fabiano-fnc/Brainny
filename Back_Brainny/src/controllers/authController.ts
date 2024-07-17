import { Request, Response } from 'express';
import User from '../model/User'; 
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
      
    if (user && (senha === user.senha)) {
      const token = jwt.sign({ id: user.id, username: user.name }, process.env.SECRET_KEY!, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};
