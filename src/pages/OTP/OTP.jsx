import React, { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import Header from "../Main/components/Header/Header.jsx";

export default function OTP({ onSubmit }) {
    const [step, setStep] = useState("phone"); // "phone" or "otp"
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);

    // Phone number validation
    const isValidPhone = (phoneNumber) => {
        return /^09[0-9]{9}$/.test(phoneNumber);
    };

    // Handle phone number submission
    const handlePhoneSubmit = async () => {
        if (!isValidPhone(phone)) {
            alert("لطفاً شماره موبایل معتبر وارد کنید");
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call to send OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStep("otp");
        } catch (error) {
            alert("خطا در ارسال کد تأیید");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle OTP input changes
    const handleOtpChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    // Handle keyboard events for OTP inputs
    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = () => {
        const code = otp.join("");
        if (code.length === otp.length && onSubmit) {
            onSubmit(code, phone);
        }
    };

    // Render phone number input step
    const renderPhoneStep = () => (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">ورود با شماره موبایل</h2>
            <p className="text-center text-gray-600 mb-6">
                لطفاً شماره موبایل خود را وارد کنید
            </p>

            <Input
                type="tel"
                inputMode="numeric"
                placeholder="09*********"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 text-center border rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={11}
            />

            <Button
                onClick={handlePhoneSubmit}
                disabled={!isValidPhone(phone) || isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? "در حال ارسال..." : "دریافت کد تأیید"}
            </Button>
        </div>
    );

    // Render OTP input step
    const renderOtpStep = () => (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2 text-center">کد تأیید</h2>
            <p className="text-center text-gray-600 mb-4">
                کد ارسال شده به شماره
                <span className="font-semibold mx-1">{phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</span>
                را وارد کنید
            </p>

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
                onClick={handleOtpSubmit}
                disabled={otp.join("").length !== otp.length}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                تأیید
            </Button>

            <button
                onClick={() => setStep("phone")}
                className="w-full text-center text-blue-500 mt-4 hover:text-blue-700"
            >
                تغییر شماره موبایل
            </button>
        </div>
    );

    return (
        <>
            <Header />
            {step === "phone" ? renderPhoneStep() : renderOtpStep()}
        </>
    );
}
