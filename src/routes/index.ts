import { Router } from 'express';
import { userRoutes } from './user/user.routes';
import { authRoutes } from './auth/auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export { routes };
