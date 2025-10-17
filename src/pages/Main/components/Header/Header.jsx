import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <>
            <div className="relative">
                <div className="py-6 flex justify-center">
                    <Link to="/">
                        <img src="/icons/Header.png" alt="لوگو" className="-mt-[60px]" />
                        <div className="flex justify-center -mt-[100px]">
                            <img src="/icons/logo.jpg" alt="Logo" />
                        </div>
                    </Link>
                </div>

                {isAuthenticated ? (
                    <div className="absolute top-[20px] left-[20px] flex gap-2">
                        <Button onClick={logout} >
                            خروج
                        </Button>
                        <Link to="/orders">
                            <Button variant="secondary">سفارشات</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="absolute top-[20px] left-[20px] flex gap-2">
                        <Link to="/login">
                            <Button >
                                <img src="/icons/Login.svg" alt="Login" />
                                ورود
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button >ثبت نام</Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="mt-5 mb-5 text-center text-lg font-semibold">
                کافه قنادی وانیلا (اقدسیه)
            </div>
        </>
    );
}
