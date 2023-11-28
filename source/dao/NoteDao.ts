import Note from "../models/Note";
import Dao from "./Dao";
import CommonOperations from "./types/CommonOperations";

export default class NoteDao implements CommonOperations<Note> {
  private dao;

  constructor() {
    this.dao = new Dao<Note>();
  }

  create(note: Note): Promise<boolean> {
    let sql =
      "INSERT INTO notes (title, content, user_id) VALUES ($title, $content, $user_id)";
    let params = {
      $title: note.title,
      $content: note.content,
      $user_id: note.user_id,
    };
    return this.dao.run(sql, params);
  }

  update(note: Note): Promise<boolean> {
    let sql =
      "UPDATE notes SET title = $title, content = $content WHERE id = $id";
    let params = {
      $id: note.id,
      $title: note.title,
      $content: note.content,
    };
    return this.dao.run(sql, params);
  }

  retreiveOne(id: string, pk: string): Promise<Note> {
    let sql = "SELECT * FROM notes WHERE id = $id AND user_id = $user_id";
    let params = {
      $id: id,
      $user_id: pk,
    };
    return this.dao.findOne(sql, params);
  }

  retreiveAll(user_id: number): Promise<Array<Note>> {
    let sql = "SELECT * FROM notes WHERE user_id = $user_id";
    let params = {
      $user_id: user_id,
    };
    return this.dao.findAllByFK(sql, params);
  }

  deleteOne(id: string | number): Promise<boolean> {
    let sql = "DELETE FROM notes WHERE id = $id";
    let params = {
      $id: id,
    };
    return this.dao.run(sql, params);
  }

  exists(key: string): Promise<boolean> {
    throw new Error("Unimplemented");
  }
}
