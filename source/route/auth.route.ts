import { Router, Response, Request } from "express";

const router = Router();

router.get("/sign-in", (req: Request, res: Response) => {
  res.send("Signing In User");
});

router.post("/sign-up", (req: Request, res: Response) => {
  res.send("Creating User");
});

export default router;
