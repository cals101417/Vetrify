import axios from "axios";

// const baseURL = 'http://127.0.0.1:8000/api';
const baseURL = "https://phplaravel-858179-3042652.cloudwaysapps.com/api";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
