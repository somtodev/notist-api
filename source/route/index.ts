import { Router } from "express";
import { default as auth } from "./auth.route";
import { default as user } from "./user.route";
import { default as note } from "./note.route";

const router = Router();
router.use("/auth", auth);
router.use("/user", user);
router.use("/note", note);

export default router;
