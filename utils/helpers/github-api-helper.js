import axios from "axios";

export const fetchRepos = async(searchText)=>{
    const fetchRepoUrl = `https://api.github.com/search/repositories?q=${searchText}&order=desc`;
    const finalResponse=[];
    const response = await axios.get(fetchRepoUrl);
    if (response.data.items.length) {
        for (let i = 0; i < response.data.items.length; i++) {
          finalResponse.push({
            repoName: response.data.items[i].name,
            ownerName: response.data.items[i].owner.login,
            description: response.data.items[i].description,
            starCount: response.data.items[i].stargazers_count,
            url: response.data.items[i].html_url,
          });
        }
    }
    return finalResponse;
}

export const fetchUsers = async(username)=>{
    const url = `https://api.github.com/search/users?q=${username}`;
    const response = await axios.get(url);
    return response;
}