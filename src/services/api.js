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
    const data = res.data;
    if (data.status === -1) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
        throw new Error("Session expired");
    }
    if (data.status === 0) throw new Error(data.message || "Request failed");
    return data.data;
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
