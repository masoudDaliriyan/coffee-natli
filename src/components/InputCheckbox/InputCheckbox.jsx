import React from "react";

const CheckboxInput = ({ className = "", label, ...props }) =>
{
    return (
        <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className={ `w-4 h-4 border border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-gray-400 ${ className }` }

                { ...props }
            />
            { label && <span>{ label }</span> }
        </label>
    );
};

export default CheckboxInput;
