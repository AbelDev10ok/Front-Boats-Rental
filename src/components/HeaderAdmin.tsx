import { useState } from 'react'
import Logout from './Logut';
import NavigationItems from './NavigationItems';

export default function HeaderAdmin() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 h-16 first-letter:">
            <Logout />
            <nav className="hidden md:flex space-x-8">
              <NavigationItems handleDropdownToggle={handleDropdownToggle} openDropdown={openDropdown} />
            </nav>

            {/* Mobile menu button (dinámico) */}
            <div className="md:hidden">
              <button onClick={handleMenu} className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none">
                {menuOpen ? ( // Tus iconos originales
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
              </button>
            </div>
          </div>
        </div>

          {/* Mobile menu (condicional) */}
          {menuOpen && (
            <div className="md:hidden bg-white px-4 pt-2 pb-3 space-y-1">
              <NavigationItems handleDropdownToggle={handleDropdownToggle} openDropdown={openDropdown} />
            </div>
          )}
      </header>
    </>
  );
}

