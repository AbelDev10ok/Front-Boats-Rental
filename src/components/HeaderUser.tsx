import { Anchor, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import NavigationItemsUser from "./NavigationItemsUser";
import Logout from "./Logout";
import { useState } from "react";

export default function HeaderUser() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDropdownToggle = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-blue-600 text-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard/admin" className="flex items-center">
                            <Anchor className="h-8 w-8 mr-2" />
                            <span className="text-xl font-bold">NauticRent</span>
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8 items-center">
                        <NavigationItemsUser handleDropdownToggle={handleDropdownToggle} openDropdown={openDropdown} />
                        <Logout />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Logout />
                        <button onClick={handleMenu} className="ml-4 p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavigationItemsUser handleDropdownToggle={handleDropdownToggle} openDropdown={openDropdown} />
                    </div>
                </div>
            )}
        </header>
    );
}