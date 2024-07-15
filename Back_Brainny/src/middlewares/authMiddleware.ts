// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY!, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token inválido
      }
      req.user = user as UserPayload;
      next();
    });
  } else {
    res.sendStatus(401); // Token ausente
  }
};

export default authenticateJWT;
