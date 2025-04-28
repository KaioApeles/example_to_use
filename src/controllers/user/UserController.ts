import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user/UserService';
import { ZodError } from 'zod';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     summary: Create new user
   *     description: Create a new user with email and password
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/CreateUser'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/User'
   *       400:
   *         description: Validation error
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/users/email/{email}:
   *   get:
   *     tags:
   *       - Users
   *     summary: Find user by email
   *     parameters:
   *       - in: path
   *         name: email
   *         required: true
   *         schema:
   *           type: string
   *         description: User's email
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/User'
   *       404:
   *         description: User not found
   */
  findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.findUserByEmail({ email: req.params.email });
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     summary: Soft delete user
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User soft deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/User'
   *       404:
   *         description: User not found
   */
  softDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.softDeleteUser({ id: Number(req.params.id) });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
} 