import {findOneUser,addUserToDb} from "../utils/helpers/db-helper";
import {fetchUsers} from "../utils/helpers/github-api-helper";

export const getUserDetails = async (req, res) => {
  try {
    if (!req.query.username) {
      return await res.json({
        message: "Failure",
        error: "Please enter username to search",
      });
    }
    const username = req.query.username;
    const user = await findOneUser(username);
    if (user) {
      return await res.json({
        message: "Success",
        data: user.userDetails,
      });
    }
    const response = await fetchUsers(username);
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
    console.log(error);
    return await res.json({ message: "Internal Server Error", error: error });
  }
};
export default getUserDetails;
