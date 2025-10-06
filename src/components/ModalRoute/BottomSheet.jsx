import React, { useEffect, useState } from "react";

const BottomSheet = ({ open, onClose, children }) => {
    const [visible, setVisible] = useState(false);

    // Lock scroll and trigger animation on open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [open]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className={`w-full max-w-md bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-out
                ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
                <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto my-4"></div>
                <div className="absolute top-3 right-3">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BottomSheet;
