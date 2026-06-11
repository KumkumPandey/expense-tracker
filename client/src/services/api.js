import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://mini-expense-tracker-api-rzh7.onrender.com",
});

export default API;
