import { Router, Response, Request, NextFunction } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/sign-up", (req: Request, res: Response, next: NextFunction) => {
  controller.register(req, res).catch(next);
});

router.post("/sign-in", (req: Request, res: Response, next: NextFunction) => {
  controller.login(req, res).catch(next);
});

export default router;
