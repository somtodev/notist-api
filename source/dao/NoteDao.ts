import Note from "../models/Note";
import Dao from "./Dao";
import { DaoError } from "../types/errors";
import IDao from "./types/IDao";

export default class NoteDao implements IDao {
  private dao;

  constructor() {
    this.dao = new Dao();
  }

  create(note: Note): Promise<boolean | DaoError> {
    let sql =
      "INSERT INTO notes (content, user_id) VALUES ($content, $user_id)";
    let params = {
      $content: note.content,
      $user_id: 1,
    };
    return this.dao.run(sql, params);
  }

  exists(key: string): Promise<boolean> {
    throw new Error("Unimplemented");
  }
}
