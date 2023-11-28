import { Request, Response } from "express";
import NoteDao from "../dao/NoteDao";
import Note from "../models/Note";
import { CustomException } from "../types/errors";

export default class NoteController {
  private dao;
  constructor() {
    this.dao = new NoteDao();
  }

  /**
   *
   *
   * Description:   Creates a new note....
   * Route:         /api/note
   * Method:        POST
   *
   *
   */

  async createNote(req: Request, res: Response) {
    const { title, content } = req.body;
    if (!title && !content) throw new CustomException(209, "Note not created");
    const note = new Note(title, content, req.user?.id);
    const noteCreated = await this.dao.create(note);
    if (noteCreated) {
      res.status(200);
      res.send("Note Created");
    }
  }

  /**
   *
   *
   * Description:   Gets all user's note.
   * Route:         /api/note
   * Method:        GET
   *
   *
   */
  async retreiveAllNotes(req: Request, res: Response) {
    const notes = await this.dao.retreiveAll(req.user?.id);
    res.status(200);
    res.json(notes);
  }

  /**
   *
   *
   * Description:   Updates a user's note....
   * Route:         /api/note/:id
   * Method:        POST | PUT
   *
   *
   */

  async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const userID = req?.user?.id;

    const note = await this.dao.retreiveOne(id, userID);
    if (!note) throw new CustomException(404, "Note not found");

    const { title, content } = req.body;

    note.title = title;
    note.content = content;

    const updated = await this.dao.update(note);
    if (!updated) throw new CustomException(300, "Note not updated");
    res.json({
      message: "Updated",
    });
  }

  /**
   *
   *
   * Description:   Updates a user's note....
   * Route:         /api/note/:id
   * Method:        DELETE
   *
   *
   */

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const userID = req?.user?.id;
    const note = await this.dao.retreiveOne(id, userID);
    if (!note) throw new CustomException(404, "Note not found");
    const deleted = await this.dao.deleteOne(note?.id);
    if (!deleted) throw new CustomException(400, "Operation Failed");
    res.json({
      message: "Note Deleted",
    });
  }
}
