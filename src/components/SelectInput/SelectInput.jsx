import React from "react";

const SelectInput = ({ className = "", children, ...props }) =>
{
    return (
        <select
            className={ `text-black w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${ className }` }
            { ...props }
        >
            { children }
        </select>
    );
};

export default SelectInput;
