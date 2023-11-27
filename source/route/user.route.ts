import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const controller = new UserController();

router.post(
  "/update/:id",
  (req: Request, res: Response, next: NextFunction) => {
    controller.updateUser(req, res).catch(next);
  },
);

export default router;
