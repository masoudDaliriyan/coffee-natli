import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, logout as apiLogout, register as apiRegister, verify as apiVerifyOtp } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [loading, setLoading] = useState(false);

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
        try {
            const res = await apiLogin({ mobile, password, captcha });

            if (res.token) {
                setToken(res.token);
                setUser({
                    mobile: res.mobile,
                    fname: res.fname,
                    lname: res.lname,
                });

                localStorage.setItem("jwt", res.token);
                setLoading(false);
                return { success: true, data: res.data };
            }

            setLoading(false);

            return { success: false, message: res.message || "خطا در ورود" };
        } catch (err) {
            setLoading(false);
            return { success: false, message: err.message };
        }
    }, []);



    const logout = useCallback(() => {
        apiLogout();
        setUser(null);
        setToken(null);
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
