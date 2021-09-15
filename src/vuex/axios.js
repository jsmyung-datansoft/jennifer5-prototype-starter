import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.common["Accept"] = "application/json; charset=utf-8";
axios.defaults.baseURL = process.env.API_URL;

export default axios;