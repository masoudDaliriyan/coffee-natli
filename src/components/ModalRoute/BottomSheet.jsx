import React, {useEffect, useRef, useState} from "react";

const BottomSheet = ({ initialOpen, onClose, children }) => {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(initialOpen);


    // Lock scroll and trigger animation on open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [open]);

    const onCloseBottomSheet = ()=> {
        setOpen(false)
        setVisible(false)
        onClose()
    }

    useEffect(() => {
        setOpen(initialOpen)
        setOpen(true)
    }, []);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50  justify-center bg-black/40 flex over ">
            <div
                className={`w-full overflow-y-auto max-w-md bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-out mt-[10vh] 
                ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                onClick={(e) => e.stopPropagation()} >
                <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto my-4">

                </div>
                <div className="w-full absolute top-3">
                    <button
                        onClick={onCloseBottomSheet}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="بستن منو"
                    >
                        <img src="/icons/close.svg" alt="بستن" className="w-6 h-6" />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;
