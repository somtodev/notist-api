import Note from "../models/Note";
import Dao from "./Dao";
import IDao from "./types/IDao";

export default class NoteDao implements IDao<Note> {
  private dao;

  constructor() {
    this.dao = new Dao();
  }

  create(note: Note): Promise<boolean> {
    let sql =
      "INSERT INTO notes (content, user_id) VALUES ($content, $user_id)";
    let params = {
      $content: note.content,
      $user_id: note.user_id,
    };
    return this.dao.run(sql, params);
  }

  fetchAll(user_id: number): Promise<Array<Note>> {
    let sql = "SELECT * FROM notes WHERE user_id = $user_id";
    let params = {
      $user_id: user_id,
    };
    return this.dao.findAllByFK(sql, params);
  }

  update(note: Note): Promise<boolean> {
    let sql = "UPDATE notes SET content = $content WHERE id = $id";
    let params = {
      $id: note.id,
      $content: note.content,
    };
    return this.dao.run(sql, params);
  }

  exists(key: string): Promise<boolean> {
    throw new Error("Unimplemented");
  }
}
