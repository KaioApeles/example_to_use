import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../../controllers/user/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  await userController.create(req, res, next);
});

userRoutes.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
  await userController.findByEmail(req, res, next);
});

userRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  await userController.softDelete(req, res, next);
});

export { userRoutes }; 