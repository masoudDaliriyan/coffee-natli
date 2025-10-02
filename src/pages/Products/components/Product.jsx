import React from "react";
import Button from "../../../components/Button/Button.jsx";
import Counter from "../../../components/Counter/Counter.jsx";

export default function Product({title, price, image}) {
    return (
        <div className="p-4 shadow-sm hover:shadow-md transition w-full flex rounded-lg">
            <div className="w-1/2 flex flex-col justify-between pr-4">
                <div>
                    <h2 className="mt-2 font-semibold text-lg">{title}</h2>
                    <p className="text-gray-700"> ریال {price}</p>
                </div>
                <Button className="max-w-[90px] text-center">
                    افزودن
                </Button>
                <Counter></Counter>
            </div>
            <div className="w-1/2 h-full">
                <img
                    src={image}
                    className="w-auto h-[160px] object-cover rounded-lg"
                />
            </div>
        </div>
    );
}
