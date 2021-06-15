import express from "express";
import getUserInfo  from "../controllers/user.controller";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  getUserInfo(req, res);
});

export default usersRouter;
