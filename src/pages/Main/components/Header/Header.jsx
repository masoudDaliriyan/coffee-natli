import React from "react";
import {Link} from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";
import {useAuth} from "../../../../context/AuthContext.jsx";
import LogoIcon from '/public/icons/logo.jpg'
import LoginIcon from '/public/icons/Login.svg'
import HeaderImg from '/public/icons/cover.jpg'
import {RootLink} from "../../../../components/RootLink/RootLink.jsx";

export default function Header() {
    const {isAuthenticated, logout} = useAuth();
    return (
        <>
            <div className="relative">
                <div className="py-6 flex justify-center  bg-cover bg-center h-[300px]"
                     style={{backgroundImage: `url(${HeaderImg})`}}>


                    {isAuthenticated ? (
                        <div className="absolute top-[20px] left-[20px] flex gap-2">
                            <Button onClick={logout}>
                                خروج
                            </Button>
                            <RootLink to="/orders">
                                <Button variant="secondary">سفارشات</Button>
                            </RootLink>
                        </div>
                    ) : (
                        <div className="absolute top-[20px] left-[20px] flex gap-2">
                            <RootLink to="/login">
                                <Button>
                                    <img src={LoginIcon} alt="Login"/>
                                    ورود
                                </Button>
                            </RootLink>
                            <RootLink to="/signup">
                                <Button>ثبت نام</Button>
                            </RootLink>
                        </div>
                    )}
                    <img className="h-[50px] mt-[180px]" src={LogoIcon} alt="Logo"/>
                </div>
            </div>

            <div className="mt-5 mb-5 text-center text-lg font-semibold">
                کافه قنادی وانیلا (اقدسیه)
            </div>
        </>
    );
}
