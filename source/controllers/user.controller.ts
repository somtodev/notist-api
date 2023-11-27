import { Request, Response } from "express";
import { UserDao } from "../dao/UserDao";

export class UserController {
  private dao: UserDao;
  constructor() {
    this.dao = new UserDao();
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
