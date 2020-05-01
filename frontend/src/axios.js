import axios from "axios";

const baseUrl = "/api";
const token = localStorage.getItem("accessToken") || "";

const customAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
