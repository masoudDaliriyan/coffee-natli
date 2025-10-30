import React from "react";
import DeleteIcon from "../../../public/icons/delte.svg";

export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 text-red-700 text-sm font-medium border border-red-400 rounded-[13px] p-[15px] mb-[13px] bg-red-50">
            <img
                src={DeleteIcon}
                alt="Error"
                className="w-5 h-5 shrink-0 opacity-80"
            />
            <span>{message}</span>
        </div>
    );
}
