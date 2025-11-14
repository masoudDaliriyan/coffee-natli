import React, {useState} from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {useAuth} from "../../context/AuthContext.jsx"; // import the auth context
import LinkText from "../../components/LinkText/LinkText.jsx";
import {RootLink} from "../../components/RootLink/RootLink.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";
import Error from '../../components/Error/Error.jsx'
import {Captcha} from "../Capcha/Captcha.jsx";
import ModalRoute from "../../components/ModalRoute/ModalRoute.jsx";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage.jsx";

const Login = () => {
    const {login, loading} = useAuth();
    const rootNavigate = useRootNavigate();

    const [mobile, setMobile] = useState(""); // use mobile (API requires this)
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");
    const [base64, setBase64] = useState("")


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
            rootNavigate(from);
            document.body.style.overflow = "auto";
        } else {
            if (res.data.captchaBase64) {
                setBase64(res.data.captchaBase64)
            }
            setError(res.message || "ورود ناموفق بود.");
        }
    };
    const header = (
        <h2 className="text-2xl font-bold  text-center">ورود به حساب</h2>
    )

    return (
        <ModalRoute header={header}>
            <div className=" md:p-8">
                {
                    from ==='/rest' && (
                        <SuccessMessage message="رمز عبور جدید به شماره موبایل شما ارسال شد"></SuccessMessage>
                    )
                }
                {error && (
                    <Error message={error}/>
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
                    <Captcha base64={base64} onChangeCode={(value) => {
                        setCaptcha(value)
                    }}/>
                    <Button className="w-full mt-4 justify-center" disabled={loading} variant="secondary">
                        {loading ? "در حال ورود..." : "ورود"}
                    </Button>

                    <RootLink to="/signup?from=/basket">
                        <LinkText className="w-full" disabled={loading} asChild={true}>
                            هنوز ثبت نام نکرده اید؟
                        </LinkText>
                    </RootLink>
                    <div></div>
                    <RootLink to="/reset">
                        <LinkText asChild={true} className="w-full" disabled={loading}>
                            رمز عبور خود را فراموش کرده اید ؟
                        </LinkText>
                    </RootLink>
                </form>
            </div>
        </ModalRoute>
    );
};

export default Login;
