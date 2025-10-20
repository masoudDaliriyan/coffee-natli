import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, logout as apiLogout, register as apiRegister, verify as apiVerifyOtp } from "../services/api";
import {useBasket} from "./BasketContex.jsx";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [loading, setLoading] = useState(false);
    const {clearBasket} = useBasket()

    useEffect(() => {
        if (token) {
            setUser({ token });
            localStorage.setItem("jwt", token);
        } else {
            localStorage.removeItem("jwt");
        }
    }, [token]);

    const login = useCallback(async ({ mobile, password, captcha = "" }) => {
        setLoading(true);
            const res = await apiLogin({ mobile, password, captcha });
            console.log(res)

            if (res?.data?.token) {
                setToken(res.data.token);
                setUser({
                    mobile: res.data.mobile,
                    fname: res.data.fname,
                    lname: res.data.lname,
                });

                localStorage.setItem("jwt", res.data.token);
            }

            setLoading(false);

            return { success: res.status!==0, message: res.message || "خطا در ورود" };
    }, []);



    const logout = useCallback(() => {
        apiLogout();
        setUser(null);
        setToken(null);
        clearBasket()
    }, []);

    const register = useCallback(async (payload) => {
        setLoading(true);
        try {
            const data = await apiRegister(payload);
            setLoading(false);
            return { success: true, data };
        } catch (err) {
            setLoading(false);
            return { success: false, message: err.message };
        }
    }, []);

    const verifyOtp = useCallback(async ({ mobile, verify }) => {
        setLoading(true);
        try {
            const data = await apiVerifyOtp({ mobile, verify });
            setLoading(false);
            return data; // {status:1,...} as API returns
        } catch (err) {
            setLoading(false);
            return { status: 0, message: err.message };
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                register,
                verifyOtp,
                setToken,
                loading,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
