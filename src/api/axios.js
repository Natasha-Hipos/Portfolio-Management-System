import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-portfolio-nrhp.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
