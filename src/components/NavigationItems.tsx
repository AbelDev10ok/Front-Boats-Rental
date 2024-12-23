
import { ChevronDown, User, SailboatIcon as Boat, Anchor, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const getIcon = (label: string) => {
    switch (label) {
      case 'Botes':
        return <Boat className="w-4 h-4" />
      case 'Marins':
        return <Anchor className="w-4 h-4" />
      case 'Users':
        return <User className="w-4 h-4" />
      case 'Rentas':
        return <Calendar className="w-4 h-4" />
      default:
        return null
    }
}

const navigation: NavItem[] = [
    {
        label: 'Users',
        href: 'users',
    },
    
    {
      
      label: 'Botes',
      href: 'boats',
      children: [
        { label: 'Lista de Botes', href: 'boats' },
        { label: 'Agregar Bote', href: 'add-boat' },
        // { label: 'Mantenimiento', href: '/boats/maintenance' },
      ],
    },
    {
      label: 'Marins',
      href: 'marins',
      children: [
        { label: 'Lista de Marins', href: 'marins' },
        { label: 'Agregar Marin', href: 'add-marin' },
      ],
    },
    {
      label: 'Rentas',
      href: 'rentals',
      children: [
        { label: 'Lista de Rentas', href: 'rentals' },
      ],
    },
  ]
  

interface NavItem {
    label: string
    href: string
    children?: { label: string; href: string }[]
  }

interface NavigationProps{
    handleDropdownToggle: (label: string) => void;
    openDropdown: string | null;
}

export default function NavigationItems({handleDropdownToggle, openDropdown}: NavigationProps) {
    return (
        <>
        {navigation.map((item) => (
            <div key={item.label} className="relative">
              {item.children ? (
                  <div>
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    className="w-full flex justify-between items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                    <div className='flex items-center space-x-2'>
                        {getIcon(item.label)}
                        <span>{item.label}</span>
                    </div>

                    <div>
                        <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.label ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                  </button>
                  {openDropdown === item.label && (
                      <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {item.children.map((child) => (
                            <Link
                            to={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                  <Link
                  to={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                  {getIcon(item.label)}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </>
    )
}