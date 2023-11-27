import { Router, Request, Response } from "express";
import NoteController from "../controllers/NoteController";

const router = Router();
const controller = new NoteController();

router.post("/new", async (req: Request, res: Response) => {
  controller.createNote(req, res);
});

export default router;
