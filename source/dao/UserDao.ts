import { DaoError } from "../types/errors";
import User from "../models/User";
import Dao from "./Dao";
import IDao from "./types/IDao";

export class UserDao implements IDao<User> {
  private dao: Dao;

  constructor() {
    this.dao = new Dao();
  }

  async create(user: User): Promise<boolean | DaoError> {
    let sql =
      "INSERT INTO users VALUES (null, $email, $firstname, $lastname, $password)";
    let params = {
      $firstname: user.firstname,
      $lastname: user.lastname,
      $email: user.email,
      $password: user.password,
    };
    return this.dao.run(sql, params);
  }

  update(user: User): Promise<boolean | DaoError> {
    let sql =
      "UPDATE users SET firstname=$firsname, lastname=$lastname, email=$email, password=$password WHERE id=$id";
    let params = {
      $id: user.id,
      $firstname: user.firstname,
      $lastname: user.lastname,
      $email: user.email,
      $password: user.password,
    };
    return this.dao.run(sql, params);
  }

  exists(key: string): Promise<boolean> {
    let sql = "SELECT count(*) as found FROM users WHERE email = $email";
    let params = {
      $email: key,
    };
    return this.dao.existsOne(sql, params);
  }
}
