import { Request, Response } from 'express';
import Register from '../model/Register';

export const getRegisters = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Register.findAndCountAll({
      offset,
      limit,
      order: [['registered_time', 'DESC']], // Adicione esta linha para ordenar por 'registered_time' em ordem decrescente
    });

    res.status(200).json({
      count,
      rows,
    });
  } catch (err) {
    console.error('Erro ao buscar registros de data:', err);
    res.status(500).json({ message: 'Erro ao buscar registros de data.' });
  }
};

export const createRegister = async (req: Request, res: Response) => {
  const { user_id, registered_time } = req.body;
  try {
    const newRegister = await Register.create({ user_id, registered_time });
    res.status(201).json(newRegister);
  } catch (err) {
    console.error('Erro ao criar registro de data:', err);
    res.status(500).json({ message: 'Erro ao criar registro de data.' });
  }
};
