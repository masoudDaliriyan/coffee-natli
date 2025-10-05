import React from 'react';

const Divider = ({ children }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex-grow border-t border-gray-500 mx-2"></div>
            <span className="text-md">{children}</span>
            <div className="flex-grow border-t border-gray-500 mx-2"></div>
        </div>
    );
};

export default Divider;
