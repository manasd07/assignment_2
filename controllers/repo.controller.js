import {fetchRepos} from "../utils/helpers/github-api-helper";

export const requestUserRepos = async (req, res) => {
  try {
    if (!req.query.search) {
      return res.json({
        message: "Error",
        error: "Please enter repository name to search",
      });
    }
    const searchText = req.query.search;
    const finalResponse = await fetchRepos(searchText);
    if(finalResponse.length){
      return await res.json({ message: "Success", data: finalResponse });
    }else{
      return await res.json({ message: "Error",error:"No matching repositories found"});
    }
    
  } catch (error) {
    return await res.json({
      message: "Success",
      data: "No matching data found",
    });
  }
};
export default requestUserRepos;