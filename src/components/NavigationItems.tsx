import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavigationItemsProps {
  handleDropdownToggle: (label: string) => void;
  openDropdown: string | null;
}

export default function NavigationItems({ handleDropdownToggle, openDropdown }: NavigationItemsProps) {
  const navigationItems = [
    {
      label: 'Usuarios',
      href: '/dashboard/admin/users',
      dropdownItems: [
        { label: 'Ver Usuarios', href: '/dashboard/admin/users' }
      ],
    },
    {
      label: 'Botes',
      href: '/dashboard/admin/boats',
      dropdownItems: [
        { label: 'Ver Botes', href: '/dashboard/admin/boats' },
        { label: 'Agregar Bote', href: '/dashboard/admin/add-boat' },
      ],
    },
    {
      label: 'Marineros',
      href: '/dashboard/admin/marins',
      dropdownItems: [
        { label: 'Ver Marineros', href: '/dashboard/admin/marins' },
        { label: 'Agregar Marinero', href: '/dashboard/admin/add-marin' },
      ]
    },
    {
      label: 'Rentas',
      href: '/dashboard/admin/rentals',
      dropdownItems: [
        { label: 'Ver Rentas', href: '/dashboard/admin/rentals' }
      ],
    },
  ];

  return (
    <>
      {navigationItems.map((item) => (
        <div key={item.label} className="relative group">
          <button
            onClick={() => handleDropdownToggle(item.label)}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            {item.label}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {openDropdown === item.label && (
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {item.dropdownItems.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.label}
                    to={dropdownItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

