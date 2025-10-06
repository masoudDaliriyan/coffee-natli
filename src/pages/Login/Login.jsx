import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("ایمیل و رمز عبور الزامی است.");
            return;
        }

        onLogin?.(email, password);
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
                    <label className="block text-sm font-medium mb-1">ایمیل</label>
                    <TextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
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
                <Button type="submit" className="w-full">
                    ورود
                </Button>
            </form>
        </div>
    );
};

export default Login;
