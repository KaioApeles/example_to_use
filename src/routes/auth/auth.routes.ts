import { Router } from 'express';
import { AuthController } from '../../controllers/auth/AuthController';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);

export { router as authRoutes }; 