import axios from "axios";

// Base URL of your backend
const BASE_URL = "https://www.natli.ir/cws";

// Default branch name (you can make this dynamic later)
const BRANCH = "sohrevardi-1";

// Create an axios instance
const api = axios.create({
    baseURL: `${BASE_URL}`,
    headers: { "Content-Type": "application/json" },
});

// Automatically attach JWT token (if exists)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const handleResponse = (res) => {
    return res.data
};

export const register = async (payload) => {
    const res = await api.post(`/register/${BRANCH}`, payload);
    return handleResponse(res);
};

export const verify = async (payload) => {
    const res = await api.post(`/verify/${BRANCH}`, payload);
    return handleResponse(res);
};

export const resetPassword = async (payload) => {
    const res = await api.post(`/reset/${BRANCH}`, payload);
    return handleResponse(res);
};

export const login = async (payload) => {
    const res = await api.post(`/login/${BRANCH}`, payload);
    const data = handleResponse(res);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    return data;
};

export const logout = () => {
    localStorage.removeItem("jwt");
};


export const getProducts = async () => {
    const res = await api.get(`/getProducts/${BRANCH}`);
    return handleResponse(res);
};

export const getAbout = async () => {
    const res = await api.get(`/about/${BRANCH}`);
    return handleResponse(res);
};

export const getBranchStatus = async () => {
    const res = await api.get(`/status/${BRANCH}`);
    return handleResponse(res);
};

export const test = async (temp = "") => {
    const res = await api.post(`/test/${BRANCH}`, { temp });
    return handleResponse(res);
};

export const orderCheck = async (payload) => {
    const res = await api.post(`/checkOrder/${BRANCH}`, payload);
    return handleResponse(res);
};

export const orderAdd = async (payload) => {
    const res = await api.post(`/addOrder/${BRANCH}`, payload);
    return handleResponse(res);
};

export const myOrders = async () => {
    const res = await api.post(`/myOrders/${BRANCH}`);
    return handleResponse(res);
};

export const payOrder = async (orderId) => {
    const res = await api.post(`/payOrder/${BRANCH}`, { orderId });
    return handleResponse(res);
};
