import express from "express";
import requestUserRepositories from "../controllers/repo.controller";

const repoRouter = express.Router();

repoRouter.get("/", (req, res) => {
  requestUserRepositories(req, res);
});

export default repoRouter;
