import axios from "axios";
import User from "../models/user.model";

export const getUserDetails = async (req, res) => {
  try {
    if (!req.query.username) {
      return await res.json({
        message: "Failure",
        error: "Please enter username to search",
      });
    }
    const username = req.query.username;
    const dbResponse = await User.findOne({ username });
    if (dbResponse) {
      return await res.json({
        message: "Success",
        data: dbResponse.userDetails,
      });
    }
    const url = `https://api.github.com/search/users?q=${username}`;
    const response = await axios.get(url);
    if (response.data.items.length > 0) {
      await addUserToDb(username, response.data.items);
      return await res.json({ message: "Success", data: response.data.items });
    } else if (response.data.items.length === 0) {
      return await res.json({
        message:
          "Sorry , no users found with this username . Please use exact name to search !",
      });
    }
  } catch (error) {
    return await res.json({ message: "Internal Server Error", error: error });
  }
};
const addUserToDb = async (username, userDetails) => {
  try {
    const user = new User({
      username,
      userDetails,
    });
    await user.save();
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};


