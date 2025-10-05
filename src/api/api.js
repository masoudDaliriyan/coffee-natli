import axios from "axios";

const API = "https://www.natli.ir"; // replace with your backend URL

export const getUsers = () => axios.get(`${API}`);
export const getProducts = () => axios.get(`${API}/cws/getProducts/sohrevardi-1`);
