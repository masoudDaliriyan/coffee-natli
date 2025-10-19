import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // import the auth context
import {Link, useNavigate} from "react-router-dom";
import LinkText from "../../components/LinkText/LinkText.jsx";

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [mobile, setMobile] = useState(""); // use mobile (API requires this)
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");

    const [from] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("from") || "/";
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!mobile || !password) {
            setError("شماره موبایل و رمز عبور الزامی است.");
            return;
        }

        const res = await login({mobile, password, captcha});

        if (res.success) {
            navigate(from);
            document.body.style.overflow = "auto";
        } else {
            setError(res.message || "ورود ناموفق بود.");
        }
    };

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h2>

            {error && (
                <div className="mb-4 text-red-500 text-sm font-medium text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">شماره موبایل</label>
                    <TextInput
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="مثلاً 09121112233"
                        className="text-right w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">رمز عبور</label>
                    <TextInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="text-right w-full"
                    />
                </div>
                <Button  className="w-full mt-4" disabled={loading}>
                    {loading ? "در حال ورود..." : "ورود"}
                </Button>

                <LinkText to="signup?from=/basket"  className="w-full" disabled={loading}>
                    هنوز ثبت نام نکرده اید؟
                </LinkText>
                <div></div>
                <LinkText to="reset"  className="w-full" disabled={loading}>
                    رمز عبور خود را فراموش کرده اید ؟
                </LinkText>
            </form>
        </div>
    );
};

export default Login;
