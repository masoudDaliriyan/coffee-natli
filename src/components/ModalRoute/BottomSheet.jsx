import React, { useEffect, useState } from "react";
import closeIcon from '../../../public/icons/close.svg';

const BottomSheet = ({ initialOpen, onClose, children , header, footer }) => {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(initialOpen);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const onCloseBottomSheet = () => {
        setOpen(false);
        setVisible(false);
        onClose();
    };

    useEffect(() => {
        setOpen(initialOpen);
        setOpen(true);
    }, []);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-end bg-black/40"
            onClick={onCloseBottomSheet}
        >
            <div
                className={`w-full max-w-md bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-out
                ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
                style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}
            >
                {/* Header */}
                    <div className="header flex-shrink-0 p-4 border-b border-gray-300">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onCloseBottomSheet}
                                className="hover:bg-gray-100 rounded p-2"
                            >
                                <img src={closeIcon} className="w-6 h-6" />
                            </button>
                        </div>
                        {header && (
                            <div>
                                {header}
                            </div>
                        )}


                    </div>

                {/* Content */}
                <div className="content flex-1 overflow-auto p-4 ">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="footer flex-shrink-0 p-4 border-t border-gray-300">
                        {footer}
                    </div>
                )}

            </div>
        </div>
    );
};

export default BottomSheet;
