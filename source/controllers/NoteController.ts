import { Request, Response } from "express";
import NoteDao from "../dao/NoteDao";
import Note from "../models/Note";

export default class NoteController {
  private dao;
  constructor() {
    this.dao = new NoteDao();
  }

  async createNote(req: Request, res: Response) {
    const { content } = req.body;
    if (!content || content === "") {
      res.status(209);
      res.send("Note Not Created");
      return;
    }
    const note = new Note(content);
    const noteCreated = await this.dao.create(note);
    if (noteCreated) {
      res.status(200);
      res.send("Note Created");
    }
  }
}
