import axios from "axios";

export function rootNavigate()
{
    const pathParts = window.location.pathname.split("/").filter(Boolean);

    // Take the first three segments
    const part1 = pathParts[0] || "";
    const part2 = pathParts[1] || "";
    const part3 = pathParts[2] || "";

    // Build the new path
    const finalPath = `/${ part1 }/${ part2 }/${ part3 }/`;
    console.log(finalPath);

    // Navigate
    window.location.href = finalPath;
}


function getShopDataFromLocation()
{
    const path = window.location.pathname;
    const parts = path.split("/");

    return {
        branchName: parts[2],
        tableNumber: parts[3],
    };
}
const { branchName } = getShopDataFromLocation();
// Base URL of your backend
const BASE_URL = "https://www.natli.ir/cws";

// Default branch name (you can make this dynamic later)
const BRANCH = branchName;

// Create an axios instance
const api = axios.create({
    baseURL: `${ BASE_URL }`,
    headers: { "Content-Type": "application/json" },
});

// Automatically attach JWT token (if exists)
api.interceptors.request.use((config) =>
{
    const token = localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${ token }`;
    return config;
});

const handleResponse = (res) =>
{

    console.log(res);
    if (res?.data?.status === -1)
    {
        localStorage.clear();
        rootNavigate();
    }

    return res.data;
};

export const register = async (payload) =>
{
    const res = await api.post(`/register/${ BRANCH }`, payload);
    return handleResponse(res);
};

export const verify = async (payload) =>
{
    const res = await api.post(`/verify/${ BRANCH }`, payload);
    return handleResponse(res);
};

export const resetPassword = async (payload) =>
{
    const res = await api.post(`/reset/${ BRANCH }`, payload);
    return handleResponse(res);
};


export const reCaptcha = async (payload) =>
{
    const res = await api.post(`/reCaptcha/${ BRANCH }`);
    return handleResponse(res);
};

export const login = async (payload) =>
{
    const res = await api.post(`/login/${ BRANCH }`, payload);
    const data = handleResponse(res);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    return data;
};

export const logout = () =>
{
    localStorage.removeItem("jwt");
};


export const getProducts = async () =>
{
    const res = await api.get(`/getProducts/${ BRANCH }`);
    return handleResponse(res);
};

export const getAbout = async () =>
{
    const res = await api.get(`/about/${ BRANCH }`);
    return handleResponse(res);
};

export const getBranchStatus = async () =>
{
    const res = await api.get(`/status/${ BRANCH }`);
    return handleResponse(res);
};

export const test = async (temp = "") =>
{
    const res = await api.post(`/test/${ BRANCH }`, { temp });
    return handleResponse(res);
};

export const orderCheck = async (payload) =>
{
    const res = await api.post(`/checkOrder/${ BRANCH }`, payload);
    return handleResponse(res);
};

export const orderAdd = async (payload) =>
{
    const res = await api.post(`/addOrder/${ BRANCH }`, payload);
    return handleResponse(res);
};

export const myOrders = async () =>
{
    const res = await api.post(`/myOrders/${ BRANCH }`);
    return handleResponse(res);
};

export const payOrder = async (orderId) =>
{
    const res = await api.post(`/payOrder/${ BRANCH }`, { orderId });
    return handleResponse(res);
};
