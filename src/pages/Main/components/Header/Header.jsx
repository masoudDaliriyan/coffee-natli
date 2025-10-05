import React from "react";
import {useSidebar} from "../../../../context/SidebarContext.jsx";
import {Link} from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";

export default function Header() {
    const {toggleSidebar} = useSidebar();

    return (
        <>
            <div className="relative">
                <div className="py-6 flex justify-center">
                    <Link to="/">
                        <img src="/icons/Header.png" alt="لوگو" className="-mt-[60px]"/>
                        <div className="flex justify-center -mt-[100px]">
                            <img src="/icons/logo.jpg" alt="Logo"/>
                        </div>
                    </Link>
                </div>
                <Link to="/login">
                    <Button
                        className="absolute top-[20px] left-[20px]">
                        <img src="/icons/Login.svg" alt="Logo"/>
                        ورود
                    </Button>
                </Link>
            </div>
            <div className="mt-5 mb-5 text-center text-lg font-semibold">
                کافه قنادی وانیلا (اقدسیه)
            </div>
            {/*<div className="flex px-4">*/}
            {/*    <Link to="/basket" className="ml-2">*/}
            {/*        <Button variant="secondary">سبد خرید</Button></Link>*/}
            {/*    <Link to="/login" className="ml-2">*/}
            {/*        <Button variant="secondary">ورود</Button>*/}
            {/*    </Link>*/}
            {/*    <Link to="/signup" className="ml-2">*/}
            {/*        <Button variant="secondary">ثبت نام</Button>*/}
            {/*    </Link>*/}
            {/*    <Link to="/orders" className="ml-2">*/}
            {/*        <Button variant="secondary">سفارشات</Button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </>
    );
}
