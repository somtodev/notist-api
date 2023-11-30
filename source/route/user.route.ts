import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { authorizedUser } from "../middlwares/auth.middleware";

const router = Router();
const controller = new UserController();

/**
 * Updates User Details
 */
router.post(
  "/profile",
  authorizedUser,
  (req: Request, res: Response, next: NextFunction) => {
    controller.updateUser(req, res).catch(next);
  },
);

export default router;
