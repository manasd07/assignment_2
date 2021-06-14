import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userDetails: {
    type: Array,
  },
});
const User = mongoose.model("users", userSchema);
module.exports = User;
