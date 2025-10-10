import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, logout as apiLogout, register as apiRegister } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) setUser({ token }); // optionally fetch user profile from backend
    }, [token]);

    const login = useCallback(async (mobile, password, captcha = "") => {
        setLoading(true);
        try {
            const data = await apiLogin({ mobile, password, captcha });
            setToken(data.jwt);
            setUser(data.user || { mobile });
            setLoading(false);
            return { success: true, data };
        } catch (err) {
            console.error(err);
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
            console.error(err);
            setLoading(false);
            return { success: false, message: err.message };
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
