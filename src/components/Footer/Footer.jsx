import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TextInput from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import {useSidebar} from "../../context/SidebarContext.jsx";
import EslintConfig from "../../../eslint.config.js";
import {useBasket} from "../../context/BasketContex.jsx";

export default function Footer() {
    const [searchTerm, setSearchTerm] = useState("");
    const {toggleSidebar} = useSidebar();
    const navigate = useNavigate();
    const {items} = useBasket()

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        // You could also navigate with the search term if needed
        // navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-center border-t border-gray-200">
            <div className="w-full max-w-3xl flex gap-2">
                <Button
                    variant="secondary"
                    onClick={toggleSidebar}
                    className="w-[100px] flex items-center justify-center"
                >
                    منو
                </Button>
                <TextInput
                    placeholder="جستجو..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                    onClick={() => navigate("/search")}
                />
                {items.length > 0 && (
                    <Link to="/basket">
                        <Button
                            variant="secondary"
                            className="w-[100px] flex items-center justify-center bg-green-700"
                        >
                            سبد خرید
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
