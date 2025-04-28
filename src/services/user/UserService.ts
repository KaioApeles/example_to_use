import prisma, { User } from '../prisma';
import { hash } from 'bcryptjs';
import { AppError } from '../../middlewares/errorHandler';
import {
  createUserSchema,
  findByEmailSchema,
  findByIdSchema,
  softDeleteSchema,
  type CreateUserInput,
  type FindByEmailInput,
  type FindByIdInput,
  type SoftDeleteInput,
} from '../../validators/user/user.validator';

export class UserService {
  private readonly SALT_ROUNDS = 10;

  async createUser(data: CreateUserInput): Promise<User> {
    const validatedData = createUserSchema.parse(data);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      throw new AppError('User already exists', 409);
    }
    
    const hashedPassword = await hash(validatedData.password, this.SALT_ROUNDS);

    return prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(data: FindByEmailInput): Promise<User> {
    const { email } = findByEmailSchema.parse(data);
    
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async findUserById(data: FindByIdInput): Promise<User> {
    const { id } = findByIdSchema.parse(data);
    
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async softDeleteUser(data: SoftDeleteInput): Promise<User> {
    const { id } = softDeleteSchema.parse(data);
    
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
} 