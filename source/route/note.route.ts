import { Router, Request, Response, NextFunction } from "express";
import NoteController from "../controllers/note.controller";
import { authorizedUser } from "../middlwares/auth.middleware";

const router = Router();
const controller = new NoteController();

router.post("/new", authorizedUser, async (req: Request, res: Response) => {
  controller.createNote(req, res);
});

router.get(
  "/all",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.getAllNotes(req, res).catch(next);
  },
);

router.post(
  "/:id",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.updateNote(req, res).catch(next);
  },
);

export default router;
