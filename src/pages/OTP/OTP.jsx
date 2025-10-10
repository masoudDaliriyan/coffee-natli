import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OTP({ onVerified }) {
    const { mobile: routeMobile } = useParams(); // get mobile from route /otp/:mobile
    const mobile = routeMobile || ""; // fallback if route param missing

    const { verifyOtp, login, setToken } = useAuth();
    const [otp, setOtp] = useState(Array(5).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOtpChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async () => {
        const code = otp.join("");
        if (code.length !== otp.length) return;

        setIsLoading(true);
        setError("");

        try {
            const verifyRes = await verifyOtp({ mobile, verify: code });

            if (verifyRes.status !== 1) {
                setError(verifyRes.message || "کد صحیح نیست.");
                setIsLoading(false);
                return;
            }

            const loginRes = await login({ mobile, password: verifyRes.password });
            if (loginRes.status === 1 && loginRes.data?.jwt) {
                setToken(loginRes.data.jwt);
                onVerified?.();
            } else {
                setError(loginRes.message || "خطا در ورود خودکار.");
            }
        } catch (err) {
            console.log(err)
            setError("خطا در برقراری ارتباط با سرور.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2 text-center">کد تأیید</h2>
            <p className="text-center text-gray-600 mb-4">
                کد ارسال شده به شماره{" "}
                <span className="font-semibold">
                    {(mobile || "").replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}
                </span>{" "}
                را وارد کنید
            </p>

            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

            <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>

            <Button
                onClick={handleSubmit}
                disabled={otp.join("").length !== otp.length || isLoading}
                variant="secondary"
                className="w-full justify-center"
            >
                {isLoading ? "در حال تأیید..." : "تأیید"}
            </Button>
        </div>
    );
}
