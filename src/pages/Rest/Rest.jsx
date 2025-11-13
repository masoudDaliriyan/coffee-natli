import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { resetPassword } from "../../services/api.js";
import {useRootNavigate} from "../../utils/RootNavigate.js";
import Error from '../../components/Error/Error.jsx'
import {Captcha} from "../Capcha/Captcha.jsx";

const ResetPassword = () => {
    const rootNavigate = useRootNavigate();

    const [mobile, setMobile] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [base64,setBase64]  = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!mobile) {
            setError("شماره موبایل الزامی است.");
            return;
        }

        setLoading(true);
        const res = await resetPassword({ mobile, captcha });
        console.log(res)

        if (res.success) {
            setMessage("درخواست بازیابی رمز عبور با موفقیت ارسال شد.");
            rootNavigate("/login");
        } else {
            if(res.data.captchaBase64){
                setBase64(res.data.captchaBase64)
            }
            setError(res.message || "ارسال درخواست ناموفق بود.");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">بازیابی رمز عبور</h2>

            {error && (
                <Error message={error}/>
            )}

            {message && (
                <div className="mb-4 text-green-600 text-sm font-medium text-center">
                    {message}
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
                    <Captcha onChangeCode={setCaptcha} base64={base64}></Captcha>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "در حال ارسال..." : "بازیابی رمزعبور"}
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
