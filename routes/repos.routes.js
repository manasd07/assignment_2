import express from "express";
const router = express.Router();
import { requestUserRepos } from "../controllers/repo.controller";

router.get("/", (req, res) => {
  requestUserRepos(req, res);
});

export default router;
