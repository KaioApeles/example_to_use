import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '../prisma';
import { loginSchema, type LoginInput } from '../../validators/auth/auth.validator';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_this';
  private readonly JWT_EXPIRES_IN = '1d';

  async login(data: LoginInput): Promise<{ token: string } | null> {
    const validatedData = loginSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await compare(validatedData.password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const token = sign(
      { userId: user.id, email: user.email },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    return { token };
  }
} 