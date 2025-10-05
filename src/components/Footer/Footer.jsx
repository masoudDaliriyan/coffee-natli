import React, {useState} from "react";
import TextInput from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import {useSidebar} from "../../context/SidebarContext.jsx";

export default function Footer() {
    const [searchTerm, setSearchTerm] = useState("");
    const {toggleSidebar} = useSidebar()

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
        // Add your search logic here
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-center border-t border-gray-200">
            <div className="w-full max-w-3xl flex gap-2">
                <Button
                    variant="secondary"
                    onClick={toggleSidebar}
                    className="w-[100px]  flex items-center justify-center"
                >
                    منو
                </Button>
                <TextInput
                    placeholder="جستجو..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
            </div>
        </div>
    );
}
