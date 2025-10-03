import axios from "axios";

const API = "https://www.natli.ir/cws/test/sohrevardi-1"; // replace with your backend URL

export const getUsers = () => axios.get(`${API}`);
