import mongoose from "mongoose";
const Schema = mongoose.Schema;
const repoListSchema = new Schema({
  repoName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  starCount: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const repoSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    repoList: [repoListSchema],
  },
  {
    timestamps: true,
  }
);

const Repos = mongoose.model("repositories", repoSchema);
module.exports = Repos;
