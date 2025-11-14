import React from "react";

export default function SuccessMessage({ message }) {
    if (!message) return null;

    return (
        <div className="text-green-700 text-sm font-medium border border-green-400 rounded-[13px] p-[15px] mb-[13px] bg-green-50">
            {message}
        </div>
    );
}
