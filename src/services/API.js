import axios from "axios";

export default (url = "https://dummyjson.com/") => {
  return axios.create({
    baseURL: url,
  });
};
