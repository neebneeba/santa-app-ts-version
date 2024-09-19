import axios from "axios";

// For calling 3th party api
const serverAxiosInstance = axios.create({
  baseURL: process.env.GITHUB_USER_CONTENT,
});

export default serverAxiosInstance;
