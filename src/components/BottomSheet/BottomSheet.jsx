import React, { useEffect } from "react";

const BottomSheet = ({ open, onClose, children }) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white rounded-t-2xl p-4 shadow-lg transform transition-transform duration-300"
                style={{ animation: "slideUp 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
                <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                {children}
            </div>

            {/* Animation */}
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default BottomSheet;
