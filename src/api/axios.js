import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    // If your Laravel API uses auth tokens:
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default API;
