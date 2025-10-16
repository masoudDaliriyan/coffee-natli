import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function OTP() {
    const { mobile: routeMobile } = useParams();
    const mobile = routeMobile || "";
    const navigate = useNavigate();

    const { verifyOtp, setToken } = useAuth();

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
            console.log(verifyRes)
            // ✅ API response format assumed:
            // { status: 1, message: "...", data: { token: "...", fname, lname, ... } }

            if (verifyRes.status !== 1) {
                setError(verifyRes.message || "کد صحیح نیست.");
                return;
            }

            // ✅ Store token in context + localStorage
            const token = verifyRes.data?.token;
            if (token) {
                setToken(token);
                localStorage.setItem("jwt", token);
            }

            // ✅ Redirect to /products
            navigate("/products");
        } catch (err) {
            console.error(err);
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
                <span className="font-semibold">{mobile}</span> را وارد کنید
            </p>

            {error && (
                <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}

            <div className="flex flex-row-reverse justify-center gap-2 mb-6">
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
