import React, { useState } from "react";
import Header from "../Main/components/Header/Header.jsx";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const Login = ({ onLogin }) =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setError("");

        if (!email || !password)
        {
            setError("ایمیل و رمز عبور الزامی است.");
            return;
        }

        onLogin(email, password);
    };

    return (
        <>
            <Header />
            <div className="w-full max-w-md p-8 bg-white rounded-lg ">
                <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h2>

                { error && (
                    <div className="mb-4 text-red-500 text-sm font-medium">{ error }</div>
                ) }

                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">ایمیل</label>
                        <TextInput
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                            placeholder="example@domain.com"
                            className="text-right"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">رمز عبور</label>
                        <TextInput
                            type="password"
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                            placeholder="********"
                            className="text-right"
                        />
                    </div>

                    <Button type="submit">ورود</Button>
                </form>
            </div>
        </>
    );
};

export default Login;
