import { Request, Response, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AuthService } from '../../services/auth/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Login user
   *     description: Authenticate a user and return a JWT token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/Login'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid credentials
   *       400:
   *         description: Validation error
   */
  login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.authService.login(req.body);

      if (!result) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation error',
          details: error.errors,
        });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };
} 