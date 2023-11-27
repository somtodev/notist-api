import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  controller.createUser(req, res).catch(next);
});

router.post(
  "/update/:id",
  (req: Request, res: Response, next: NextFunction) => {
    controller.updateUser(req, res).catch(next);
  },
);

router.post("/login", (req: Request, res: Response) => {
  res.send("login");
});

export default router;
