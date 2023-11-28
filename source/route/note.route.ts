import { Router, Request, Response, NextFunction } from "express";
import NoteController from "../controllers/note.controller";
import { authorizedUser } from "../middlwares/auth.middleware";

const router = Router();
const controller = new NoteController();

/**
 * Retrieves all the notes from the database
 */
router.get(
  "/",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.retreiveAllNotes(req, res).catch(next);
  },
);

/**
 * Creates a new note...
 */
router.post(
  "/",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.createNote(req, res).catch(next);
  },
);

/**
 * Updates a note...
 */
router.post(
  "/:id",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.updateNote(req, res).catch(next);
  },
);

/**
 * Delete a note...
 */
router.delete(
  "/:id",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.deleteNote(req, res).catch(next);
  },
);

export default router;
