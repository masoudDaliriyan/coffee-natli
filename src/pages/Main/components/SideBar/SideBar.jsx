import React from "react";
import { useSidebar } from "../../../../context/SidebarContext.jsx";

const MENU_ITEMS = ['خانه', 'محصولات', 'سبد خرید', 'پروفایل'];

export default function Sidebar()
{
    const { isOpen, toggleSidebar, activeItem, setActiveItem } = useSidebar();

    const handleItemClick = (item) =>
    {
        setActiveItem(item);
        toggleSidebar(); // Close sidebar after selection
    };

    return (
        <aside
            dir="rtl"
            className={ `
                fixed top-0 right-0 h-full w-64 bg-white p-4 z-50 transform
                transition-transform duration-300 ease-in-out
                ${ isOpen ? "translate-x-0" : "translate-x-full" }
            `}
        >
            {/* Header */ }
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">منو</h2>
                <button
                    onClick={ toggleSidebar }
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="بستن منو"
                >
                    <img
                        src="/icons/close.svg"
                        alt="بستن"
                        className="w-6 h-6"
                    />
                </button>
            </div>

            {/* Menu Items */ }
            <nav>
                <ul className="space-y-2">
                    { MENU_ITEMS.map((item) => (
                        <li key={ item }>
                            <button
                                onClick={ () => handleItemClick(item) }
                                className={ `
                                    w-full text-right p-3 rounded-lg transition-all
                                    hover:bg-gray-100 hover:text-gray-700
                                    ${ activeItem === item
                                        ? 'bg-blue-50 text-blue-600 font-medium border border-blue-200'
                                        : 'text-gray-800'
                                    }
                                `}
                            >
                                { item }
                            </button>
                        </li>
                    )) }
                </ul>
            </nav>
        </aside>
    );
}