import { prisma } from './../lib/prisma';
import bcrypt from 'bcryptjs';

class UserService {
  async getAllUsers(): Promise<UserService.UserCreateService.UserResponse[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true
      },
      orderBy: {
        createdAt: "asc",
      }
    });
  }

  async getUserById(id: string): Promise<UserService.UserCreateService.UserResponse | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true
      },
    });
  }

  async createUser(user: UserService.UserCreateService.UserRequest): Promise<UserService.UserCreateService.UserResponse> {
    return await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
        type: user.type,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        type: true,
      }
    })
  }
}

export const userService = new UserService();

export namespace UserService {
  export namespace UserCreateService {
    export type UserRequest = {
      username: string;
      email: string;
      password: string;
      type: 'user' | 'professional';
      role: 'user' | 'admin';
    };
    export type UserResponse = {
      id: string
      username: string
      email: string
    }
  }
}