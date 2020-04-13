import axios from "axios";

const baseUrl = "https://sweetlifehotel.herokuapp.com/api";

const developUrl = 'http://127.0.0.1:8000/api'
const token = localStorage.getItem("accessToken") || "";

const customAxios = axios.create({
  baseURL: developUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
