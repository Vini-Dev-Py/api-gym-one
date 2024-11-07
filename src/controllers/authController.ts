import { prisma } from './../lib/prisma';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido');
}

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  async login(
      req: Request<AuthController.Login.Request>, 
      res: Response<AuthController.Login.Response | AuthController.Login.Error>
    ) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          type: user.type,
          role: user.role,
        }
      });
    } catch (error) {
      console.error('Erro durante o login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export const authController = new AuthController();

export namespace AuthController {
  export namespace Login {
    export type User = {
      id: string
      username: string
      email: string
      type: string;
      role: string;
    }
    export type Request = {
      email: string
      password: string
    }
    export type Response = {
      token: string
      user: User
    };
    export type Error = {
      error: string
    }
  }
}