import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController';
import { getRegisters, createRegister } from '../controllers/registerControllers';
import authenticateJWT from '../middlewares/authMiddleware';

const router = Router();

router.get('/usuarios', authenticateJWT, getUsers);
router.post('/usuarios', authenticateJWT, createUser);

router.get('/registers', authenticateJWT, getRegisters);
router.post('/registers', authenticateJWT, createRegister);

export default router;
