import React from "react";
import { useSidebar } from "../../../../context/SidebarContext.jsx";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";

export default function Header()
{
    const { toggleSidebar } = useSidebar();

    return (
        <>
            <div
                className="p-4 flex items-center gap-2 justify-between"
                style={ {
                    backgroundImage: `radial-gradient(circle, #fff, rgba(255, 255, 255, 0.1)), url(/icons/img.png)`,
                } }
            >
                <div className="flex">
                    <Button onClick={ toggleSidebar }>
                        <img
                            className="w-[20px] h-[20px] cursor-pointer"
                            src="/icons/menus.png"
                            alt="Menu Icon"
                        />
                        منو
                    </Button>
                    <div className="mx-1"></div>
                </div>
                <Link to="/">
                    <img src="/icons/logo.jpg" alt="لوگو" />
                </Link>
            </div>
            <div className="flex p-4">
                <Link to="/basket" className="ml-2">
                    <Button variant="secondary">سبد خرید</Button></Link>
                <Link to="/login" className="ml-2">
                    <Button variant="secondary">ورود</Button>
                </Link>
                <Link to="/signup" className="ml-2">
                    <Button variant="secondary">ثبت نام</Button>
                </Link>
                <Link to="/orders" className="ml-2">
                    <Button variant="secondary">سفارشات</Button>
                </Link>
            </div>
        </>
    );
}
