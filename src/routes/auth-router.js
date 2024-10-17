import { Router } from 'express';
import { login, register } from '../controllers/auth-controllers.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const authRouter = Router();

authRouter.post('/login', authMiddleware.checkLoginFields, login);
authRouter.post('/register', authMiddleware.checkRegisterFields, register);

export default authRouter;