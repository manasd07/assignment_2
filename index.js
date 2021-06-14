import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect, connection as _connection } from "mongoose";
import githubRouter from "./routes/repos.routes";
import usersRouter from "./routes/users.routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res, next) => {
  res.json({ message: "from index api" });
});

const uri = process.env.ATLAS_URI;
connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = _connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
connection.on("error", (err) => {
  console.log("Error in MongoDB connection", err);
});
app.use("/github-api/repos", githubRouter);
app.use("/github-api/users", usersRouter);
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
