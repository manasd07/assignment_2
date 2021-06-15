import express from "express";
const router = express.Router();
import { getUserDetails } from "../controllers/user.controller";

router.get("/", (req, res) => {
  getUserDetails(req, res);
});

export default router;
