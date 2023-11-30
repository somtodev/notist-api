import { Request, Response } from "express";
import { UserDao } from "../dao/UserDao";
import { CustomException } from "../types/errors";

export class UserController {
  private dao: UserDao;
  constructor() {
    this.dao = new UserDao();
  }

  async updateUser(req: Request, res: Response) {
    const id = req?.user?.id;

    if (!id) throw new CustomException(403, "Unauthorized");

    const user = await this.dao.findByEmail(req?.user?.email);

    const { firstname, lastname } = req.body;

    if (!firstname || !lastname)
      throw new CustomException(400, "Provide Required Details");

    user.firstname = firstname;
    user.lastname = lastname;

    console.trace(user);
    const updated = await this.dao.update(user);

    if (!updated) throw new CustomException(300, "Something went wrong");

    res.status(200);
    res.json({
      message: "Information Updated",
    });
  }
}
