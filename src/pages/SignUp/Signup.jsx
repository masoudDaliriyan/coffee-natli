import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // import the context
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile: "",        // ← use the real API field
        password: "",
        firstName: "",
        lastName: "",
        gender: 0,
        birthDate: "",
        nCode: "",
        captcha: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const res = await register(form);
        if (res.success) {
            setSuccess("ثبت نام با موفقیت انجام شد. لطفاً برای ورود تأیید کنید.");
            setTimeout(() => navigate(`/otp/${form.mobile}`), 1500);
        } else {
            setError(res.message || "ثبت نام ناموفق بود.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl w-full space-y-4"
        >
            <h2 className="text-2xl font-bold text-center mb-4">ثبت نام</h2>

            <TextInput
                name="mobile"
                type="text"
                placeholder="شماره موبایل (مثلاً 09121112233)"
                value={form.mobile}
                onChange={handleChange}
            />

            <TextInput
                name="password"
                type="password"
                placeholder="رمز عبور"
                value={form.password}
                onChange={handleChange}
            />

            <TextInput
                name="firstName"
                type="text"
                placeholder="نام"
                value={form.firstName}
                onChange={handleChange}
            />

            <TextInput
                name="lastName"
                type="text"
                placeholder="نام خانوادگی"
                value={form.lastName}
                onChange={handleChange}
            />

            <TextInput
                name="gender"
                type="number"
                placeholder="جنسیت (0=مرد،1=زن)"
                value={form.gender}
                onChange={handleChange}
            />

            <TextInput
                name="birthDate"
                type="text"
                placeholder="تاریخ تولد (مثلاً 13720101)"
                value={form.birthDate}
                onChange={handleChange}
            />

            <TextInput
                name="nCode"
                type="text"
                placeholder="کد ملی"
                value={form.nCode}
                onChange={handleChange}
            />

            <TextInput
                name="captcha"
                type="text"
                placeholder="کد کپچا (در صورت نیاز)"
                value={form.captcha}
                onChange={handleChange}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <Button
                type="submit"
                className="w-full justify-center"
                disabled={loading}
            >
                {loading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
        </form>
    );
};

export default Signup;
