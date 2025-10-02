import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Header from "../Main/components/Header/Header.jsx";

const Signup = () =>
{
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log("Signup form submitted:", form);
        // TODO: send data to API
    };

    return (
        <>
            <Header></Header>
            <form
                onSubmit={ handleSubmit }
                className="bg-white p-6 rounded-2xl  w-full space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">ثبت نام</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">نام کاربری</label>
                    <TextInput
                        name="username"
                        type="text"
                        placeholder="نام کاربری"
                        value={ form.username }
                        onChange={ handleChange }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">ایمیل</label>
                    <TextInput
                        name="email"
                        type="email"
                        placeholder="ایمیل"
                        value={ form.email }
                        onChange={ handleChange }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">رمز عبور</label>
                    <TextInput
                        name="password"
                        type="password"
                        placeholder="رمز عبور"
                        value={ form.password }
                        onChange={ handleChange }
                    />
                </div>

                <Button type="submit" className="w-full justify-center">
                    ثبت نام
                </Button>
            </form>
        </>
    );
};

export default Signup;
