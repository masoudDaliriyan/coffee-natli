import React, { useState } from "react";
import TextInput from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // import the auth context
import LinkText from "../../components/LinkText/LinkText.jsx";
import {RootLink} from "../../components/RootLink/RootLink.jsx";
import {useRootNavigate} from "../../utils/RootNavigate.js";
import Error from '../../components/Error/Error.jsx'
import {Captcha} from "../Capcha/Captcha.jsx";
const Login = () => {
    const { login, loading } = useAuth();
    const rootNavigate = useRootNavigate();

    const [mobile, setMobile] = useState(""); // use mobile (API requires this)
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [base64,setBase64] = useState("")


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
            console.log(res)
            if(res.data.captchaBase64){
                setBase64(res.data.captchaBase64)
            }
            // setBase64("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")
            // if(res?.captchaBase64){
            //
            // }
            setError(res.message || "ورود ناموفق بود.");
        }
    };

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h2>
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
                <Captcha base64={base64} onChangeCode={(value)=>{setCaptcha(value)}} />
                <Button  className="w-full mt-4" disabled={loading}>
                    {loading ? "در حال ورود..." : "ورود"}
                </Button>

                <RootLink to="/signup?from=/basket" >
                    <LinkText className="w-full" disabled={loading} asChild={true}>
                        هنوز ثبت نام نکرده اید؟
                    </LinkText>
                </RootLink>
                <div></div>
                <RootLink to="/reset">
                    <LinkText asChild={true}  className="w-full" disabled={loading}>
                        رمز عبور خود را فراموش کرده اید ؟
                    </LinkText>
                </RootLink>
            </form>
        </div>
    );
};

export default Login;
