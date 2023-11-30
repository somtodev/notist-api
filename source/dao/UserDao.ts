import User from "../models/User";
import Dao from "./Dao";
import CommonOperations from "./types/CommonOperations";

export class UserDao implements CommonOperations<User> {
  private dao: Dao<User>;

  constructor() {
    this.dao = new Dao();
  }

  async create(user: User): Promise<boolean> {
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

  async findByEmail(email: string): Promise<User> {
    let sql = "SELECT * FROM users WHERE email = $email";
    let params = {
      $email: email,
    };
    return this.dao.findOne(sql, params);
  }

  async update(user: User): Promise<boolean> {
    let sql =
      "UPDATE users SET firstname = $firsname, lastname = $lastname WHERE id=$id";
    let params = {
      $id: user.id,
      $firstname: user.firstname,
      $lastname: user.lastname,
      $email: user.email,
    };
    return this.dao.run(sql, params);
  }

  async exists(key: string): Promise<boolean> {
    let sql = "SELECT count(*) as found FROM users WHERE email = $email";
    let params = {
      $email: key,
    };
    return this.dao.existsOne(sql, params);
  }

  deleteOne(id: string | number): Promise<boolean> {
    throw new Error("Unimplemented");
  }

  retreiveOne(id: string, pk: string): Promise<User> {
    throw new Error("Unimplemented");
  }

  retreiveAll(pk: string | number): Promise<User[]> {
    throw new Error("Unimplemented");
  }
}
