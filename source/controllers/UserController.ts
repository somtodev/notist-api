import { Request, Response } from "express";
import { UserDao } from "../dao/UserDao";
import User from "../models/User";
import { CustomException } from "../types/errors";

export class UserController {
  private dao: UserDao;
  constructor() {
    this.dao = new UserDao();
  }

  async createUser(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || firstname === "") {
      throw new CustomException(400, "Enter Firstname");
    }

    if (!lastname || lastname === "") {
      throw new CustomException(400, "Enter Lastname");
    }

    if (!email || email === "") {
      throw new CustomException(400, "Enter Email");
    }

    if (!password || password === "") {
      throw new CustomException(400, "Enter Password");
    }

    const existingUser = await this.dao.exists(email);

    if (existingUser) {
      throw new CustomException(400, "User Exists");
    }

    const user: User = new User(firstname, lastname, email, password);
    const userCreated = await this.dao.create(user);
    if (userCreated) {
      res.status(200);
      res.json({
        message: "User Created",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.query;

    if (!id) {
      res.status(400);
      res.json({
        message: "No User ID, Provided",
      });
      return;
    }

    res.status(200);
    res.json({
      message: "Update User Details",
    });
  }
}
