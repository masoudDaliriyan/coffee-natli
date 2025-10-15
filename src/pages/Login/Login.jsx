import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // import the auth context
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [mobile, setMobile] = useState(""); // use mobile (API requires this)
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!mobile || !password) {
            setError("شماره موبایل و رمز عبور الزامی است.");
            return;
        }

        const res = await login({mobile, password, captcha});

        if (res.success) {
            navigate("/");
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

                <div>
                    <label className="block text-sm font-medium mb-1">کپچا (در صورت نیاز)</label>
                    <TextInput
                        value={captcha}
                        onChange={(e) => setCaptcha(e.target.value)}
                        placeholder="کد کپچا"
                        className="text-right w-full"
                    />
                </div>
                <Link to="/reset">
                    <Button type="submit" className="w-full" disabled={loading}>
                        فراموشی رمز عبور
                    </Button>
                </Link>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "در حال ورود..." : "ورود"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
