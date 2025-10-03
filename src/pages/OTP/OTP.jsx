import React, { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import Header from "../Main/components/Header/Header.jsx";

export default function OTP({ phone = "0912***1234", length = 6, onSubmit }) {
    const [otp, setOtp] = useState(Array(length).fill(""));

    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleSubmit = () => {
        const code = otp.join("");
        if (code.length === length && onSubmit) {
            onSubmit(code);
        }
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-sm mx-auto">
                <h2 className="text-xl font-bold mb-2 text-center">کد تأیید</h2>
                <p className="text-center text-gray-600 mb-4">
                    کد ارسال شده به شماره <span className="font-semibold">{phone}</span> را وارد کنید
                </p>

                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    تأیید
                </Button>
            </div>
        </>
    );
}
