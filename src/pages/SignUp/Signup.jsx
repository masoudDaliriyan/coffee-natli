import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useRootNavigate } from "../../utils/RootNavigate.js";
import Error from '../../components/Error/Error.jsx';
import { Captcha } from "../Capcha/Captcha.jsx";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";


const Signup = () =>
{
    const { register, loading } = useAuth();
    const rootNavigate = useRootNavigate();
    const [captcha, setCaptcha] = useState("");
    const [captchaBase64, setCaptchaBase64] = useState("");

    const [form, setForm] = useState({
        mobile: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [from] = useState(() =>
    {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("from") || "";
    });


    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setError("");
        setSuccess("");

        const res = await register({ ...form, captcha });

        if (res.data.status)
        {
            setSuccess("ثبت نام با موفقیت انجام شد. لطفاً برای ورود تأیید کنید.");
            setTimeout(() => rootNavigate(`/otp/${ form.mobile }?from=${ from }`), 1500);
        } else
        {
            if (res.data.data.captchaBase64)
            {
                setCaptchaBase64(res.data.data.captchaBase64);
            }
            setError(res.data.message || "ثبت نام ناموفق بود.");
        }
    };
    const header = (
        <h2 className="text-2xl font-bold text-center ">ثبت نام</h2>
    );

    const footer = (
        <Button
            type="submit"
            variant="secondary"
            className="w-full justify-center"
            onClick={ handleSubmit }
            disabled={ loading }
        >
            { loading ? "در حال ثبت نام..." : "ثبت نام" }
        </Button>
    );

    return (
        <ModalRoute header={ header } footer={ footer }>
            <form
                className="bg-white rounded-2xl w-full space-y-4"
            >


                <div>
                    <label className="block text-sm font-medium mb-1">شماره موبایل</label>
                    <TextInput
                        name="mobile"
                        type="text"
                        value={ form.mobile }
                        onChange={ handleChange }
                        placeholder="مثلاً 09121112233"
                        className="text-right w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">رمز عبور</label>
                    <TextInput
                        name="password"
                        type="password"
                        value={ form.password }
                        onChange={ handleChange }
                        placeholder="********"
                        className="text-right w-full"
                    />
                </div>

                <Captcha base64={ captchaBase64 } onChangeCode={ setCaptcha } />
                {
                    error && (
                        <Error message={ error } />
                    )
                }
                { success && <p className="text-green-600 text-sm">{ success }</p> }
            </form>
        </ModalRoute>
    );
};

export default Signup;
