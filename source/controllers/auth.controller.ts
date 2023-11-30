import { Request, Response } from "express";
import { UserDao } from "../dao/UserDao";
import User from "../models/User";
import { CustomException } from "../types/errors";
import { hashPayload, verifyPayload } from "../utils/hash.util";
import { generateToken } from "../utils/jwt.util";

export default class AuthController {
  private dao: UserDao;

  constructor() {
    this.dao = new UserDao();
  }

  async register(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || firstname === "") {
      throw new CustomException(206, "Enter Firstname");
    }

    if (!lastname || lastname === "") {
      throw new CustomException(206, "Enter Lastname");
    }

    if (!email || email === "") {
      throw new CustomException(206, "Enter Email");
    }

    if (!password || password === "") {
      throw new CustomException(206, "Enter Password");
    }

    const existingUser = await this.dao.exists(email);

    if (existingUser) {
      throw new CustomException(409, "Account with email exists");
    }

    const user: User = new User(
      firstname,
      lastname,
      email,
      hashPayload(password),
    );
    const userCreated = await this.dao.create(user);
    if (userCreated) {
      res.status(200);
      res.json({
        message: "Account Created",
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = (await this.dao.findByEmail(email)) as User;
    if (!user || user == null) {
      throw new CustomException(404, "Invalid Credentials");
    }

    const matchedPassword = await verifyPayload(user.password, password);

    if (!matchedPassword) {
      res.status(401);
      res.send("Invalid Password");
      return;
    }

    res.status(200);
    res.json({
      message: "Welcome, " + user.firstname,
      token: generateToken(user),
    });
  }
}
