import React from "react";
import { useSidebar } from "../../../../context/SidebarContext.jsx";
import { useProducts } from "../../../../context/ProductContext.jsx";

export default function Sidebar() {
    const { isOpen, toggleSidebar, activeItem, setActiveItem } = useSidebar();
    const { products } = useProducts();

    if (!products) return null;

    const handleItemClick = (cat) => {
        setActiveItem(cat.cat_id);
        toggleSidebar();
    };

    return (
        <aside
            dir="rtl"
            className={`
                border-l-[0.5px] border-gray-300
                bg-gray-50 fixed top-0 right-0 h-full w-64  p-4 z-50 transform
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">منو</h2>
                <button
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="بستن منو"
                >
                    <img src="/icons/close.svg" alt="بستن" className="w-6 h-6" />
                </button>
            </div>

            <nav>
                <ul className="space-y-2">
                    {products.cats.map((cat) => (
                        <li key={cat.cat_id}>
                            <button
                                onClick={() => handleItemClick(cat)}
                                className={`
                                    w-full text-right p-3 rounded-lg transition-all
                                    hover:bg-gray-100 hover:text-gray-700
                                    ${activeItem === cat.cat_title
                                    ? 'bg-blue-50 text-blue-600 font-medium border border-blue-200'
                                    : 'text-gray-800'}
                                `}
                            >
                                {cat.cat_title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
