import TextInput from "../../components/Input/Input.jsx";
import React, {useState} from "react";
import CaptchaIcon from '../../../public/icons/captcha.png'
import {reCaptcha} from "../../services/api.js";

export const Captcha = ({ base64,onChangeCode=()=>{} }) => {
    const [rCaptcha, setRCaptcha] = useState(0);

    const retry = async () => {
        // Add retry logic here if needed
        const rs = await reCaptcha()

        setRCaptcha(rs.data.captchaBase64)

        console.log(rs)
    };

    if (!base64) {
        return null;
    }

    return (
        <div className="flex items-end space-x-4 rtl:space-x-reverse gap-8">
            <div className="flex-1 mr-0">
            <label className="block text-sm font-medium mb-1">کد امنیتی</label>
                <TextInput
                    onChange={(e)=>onChangeCode(e.target.value)}
                    className="text-right w-full mr-0"
                />
            </div>
            <div className="flex items-end gap-2" onClick={retry}>
                <img src={`data:image/jpeg;base64,${rCaptcha || base64}`} alt="Captcha" className="h-12 w-auto border rounded" />
                <img src={CaptchaIcon} className="w-[30px] cursor-pointer self-center"/>
            </div>
        </div>
    );
};
