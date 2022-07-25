import axios from "axios";

const instance = axios.create({
  baseURL: "https://public-api.wordpress.com/rest/v1.1/sites/208754823"
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
