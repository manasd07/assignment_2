import axios from "axios";
import Repos from "../models/repo.model";

export const requestUserRepos = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.json({
        message: "Error",
        error: "Please enter username to search",
      });
    }
    const username = req.body.username;
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;
    // // Querying mongodb to get data if already exists
    // const mongoData = await Repos.findOne({ username });
    // if (mongoData) {
    //   return await res.json({ message: "Success", data: mongoData.repoList });
    // }
    const response = await axios.get(url);
    const finalResponse = [];
    if (response.data.length) {
      for (let i = 0; i < response.data.length; i++) {
        finalResponse.push({
          repoName: response.data[i].name,
          ownerName: response.data[i].owner.login,
          description: response.data[i].description,
          starCount: response.data[i].stargazers_count,
          url: response.data[i].html_url,
        });
      }
      // await addDataToDB(username, finalResponse);
    }
    return await res.json({ message: "Success", data: finalResponse });
  } catch (error) {
    return await res.json({
      message: "Success",
      data: "No matching data found",
    });
  }
};
// const addDataToDB = async (username, responseData) => {
//   try {
//     const repo = new Repos({
//       username: username,
//       repoList: responseData,
//     });
//     await repo.save();
//   } catch (error) {
//     throw new Error("Internal Server Exception");
//   }
// };
export default requestUserRepos;