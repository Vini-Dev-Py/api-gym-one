import { Request, Response } from "express";
import { userService } from "../services/userService";
import { z } from "zod";

class UserController {
  async getAllUsers(
      req: Request,
      res: Response<UserController.GetAllUsers.Response | UserController.Error>
    ) {
    try {
      const users = await userService.getAllUsers();
      res.json({users});
    } catch (error) {
      console.error("Erro ao obter todos os usuários:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getUserById(
      req: Request<UserController.GetUserById.Request>,
      res: Response<UserController.GetUserById.Response | UserController.Error>
    ) {
    try {
      const schema = z.object({
        id: z.string().uuid(),
      })

      const { id } = schema.parse(req.params)

      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json({user});
    } catch (error) {
      console.error("Erro ao obter usuário por ID:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async createUser(
      req: Request<UserController.CreateUser.Request>,
      res: Response<UserController.CreateUser.Response | UserController.Error>
    ) {
    try {
      const schema = z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        type: z.enum(['user', 'professional']),
        role: z.enum(['user', 'admin'])
      })

      const { username, email, password, role, type } = schema.parse(req.body);

      const user = await userService.createUser({
        username,
        email,
        password,
        role,
        type
      });

      if (!user) {
        return res.status(400).json({
          error: "Não foi possível criar um usúario com as informações enviadas"
        });
      }

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Erro na criação de um usúario", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  updateUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  deleteUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}

export const userController = new UserController();

export namespace UserController {
  export namespace GetAllUsers {
    export type Response = {
      users: User[]
    };
  }

  export namespace GetUserById {
    export type Request = {
      id: string;
    }

    export type Response = {
      user: User
    };
  }

  export namespace CreateUser {
    export type Request = {
      username: string;
      email: string;
      password: string;
      type: 'user' | 'professional';
      role: 'user' | 'admin';
    };

    export type Response = {
      id: string;
      username: string;
      email: string;
    };
  }

  export type Error = {
    error: string
  }

  export type User = {
    id: string;
    username: string;
    email: string;
  }
}