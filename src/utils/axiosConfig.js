import axios from "axios";

// const baseURL = 'http://127.0.0.1:8000/api';
const baseURL =
  "https://safety-integrated-management.com/api/send/notification";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
