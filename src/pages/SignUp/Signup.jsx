import React, {useState} from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {useAuth} from "../../context/AuthContext.jsx"; // import the context
import SelectInput from "../../components/SelectInput/SelectInput.jsx";
import PersianDateInput from "../../components/PersianDataInput/PersianDateInput.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";
import Error from '../../components/Error/Error.jsx'
import {Captcha} from "../Capcha/Captcha.jsx";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";


const Signup = () => {
    const {register, loading} = useAuth();
    const rootNavigate = useRootNavigate();
    const [captcha, setCaptcha] = useState("");
    const [captchaBase64, setCaptchaBase64] = useState("");


    const [form, setForm] = useState({
        mobile: "",        // ← use the real API field
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        nCode: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [from] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("from") || "";
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const res = await register({...form, captcha});

        if (res.data.status) {
            setSuccess("ثبت نام با موفقیت انجام شد. لطفاً برای ورود تأیید کنید.");
            setTimeout(() => rootNavigate(`/otp/${form.mobile}?from=${from}`), 1500);
        } else {
            if (res.data.data.captchaBase64) {
                setCaptchaBase64(res.data.data.captchaBase64)
            }
            setError(res.data.message || "ثبت نام ناموفق بود.");
        }
    };
    const header = (
        <h2 className="text-2xl font-bold text-center ">ثبت نام</h2>
    )

    const footer = (
        <Button
            type="submit"
            variant="secondary"
            className="w-full justify-center"
            onClick={handleSubmit}
            disabled={loading}
        >
            {loading ? "در حال ثبت نام..." : "ثبت نام"}
        </Button>
    )

    return (
        <ModalRoute header={header} footer={footer}>
            <form
                className="bg-white rounded-2xl w-full space-y-4"
            >


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

                <SelectInput
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                >
                    <option value="">انتخاب جنسیت</option>
                    <option value="0">مرد</option>
                    <option value="1">زن</option>
                </SelectInput>

                <div>
                    <label className="block text-sm font-medium mb-1">تاریخ تولد</label>
                    <PersianDateInput
                        name="birthDate"
                        value={form.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <TextInput
                    name="nCode"
                    type="text"
                    placeholder="کد ملی"
                    value={form.nCode}
                    onChange={handleChange}
                />
                <Captcha base64={captchaBase64} onChangeCode={setCaptcha}/>
                {
                    error && (
                        <Error message={error}/>
                    )
                }
                {success && <p className="text-green-600 text-sm">{success}</p>}
            </form>
        </ModalRoute>
    );
};

export default Signup;
