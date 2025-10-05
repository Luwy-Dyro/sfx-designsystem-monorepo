import { useState } from 'react';
import type React from 'react';
import { ChevronDown, Home, Palette, Puzzle, Component, ChevronLeft, Calendar  } from 'lucide-react'; 


type MenuChild = {
  label: string;
  href?: string;
};

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuChild[];
};


const menuItems: MenuItem[] = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Fundamentos Visuales', icon: Palette, 
      children: [
        { label: 'Colores' },
        { label: 'Tipografías' },
        { label: 'Grids y Espacios' },
        { label: 'Bordes y sombras' },
        { label: 'Iconografía' }

      ]
  },
  { label: 'UI Atómico', icon: Puzzle,
      children: [
        { label: 'Botones' }, 
        { label: 'Otros componentes' }
      ] 
  },
  { label: 'Componentes complejos', icon: Component, 
    children: [
      { label: 'Botones' },
      { label: 'Otros componentes' }
    ]
  },
  { label: 'Tokens', icon: Calendar, href: '/' },
  { label: 'Accesibilidad', icon: Calendar, href: '/' },
  { label: 'Contenido y Tono', icon: Calendar, href: '/' },
  { label: 'Recursos de desarrollador', icon: Calendar, href: '/' },

  { label: 'Historial de cambios', icon: Calendar, href: '/' },
  { label: 'Configuración', icon: Calendar, href: '/' },

];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-white text-primary-blue-600
         border border-primary-blue-600 rounded-lg overflow-auto
         mt-6 ml-9 flex flex-col
         transition-all duration-300 ${isExpanded ? 'w-64' : 'w-22'} sticky top-6 z-1001` }
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-2">
     
        <div className="p-6 bg-primary-blue-600 rounded-t-md shrink-0 min-w-full w-full cursor-pointer 
          flex justify-center items-center 
        ">
          {!isExpanded && 
            <img src="./Logotipo_SF-dark.svg" alt="LogoTipo" className='h-10'/>
          }

          {isExpanded && 
           <div className='w-full flex justify-between items-center'>
          <img src="./Logo_SF-dark.svg" alt="LogoTipo" className='h-10' />
           <ChevronLeft className='h-6 w-6 text-white' />
             </div>
          }
        </div>
      
      </div>

      <nav className="flex-1 space-y-2 py-6 px-6">
        {menuItems.map(item => <NavItem key={item.label} item={item} isExpanded={isExpanded} />)}
      </nav>

        <div className="min-h-10 p-6 bg-primary-blue-600 rounded-b-md shrink-0 min-w-full mt-8">
         
        </div>
      


    </aside>
  );
};

// Sub-componente para cada item del menú
const NavItem = ({ item, isExpanded }: { item: MenuItem; isExpanded: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div 
        className="flex items-center justify-center py-3 rounded-lg hover:bg-primary-blue-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <item.icon className="h-6 w-6 shrink-0" />
        {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
        {isExpanded && item.children && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </div>
      {isOpen && isExpanded && item.children && (
        <div className="pl-10 pt-2 space-y-2">
          {item.children.map((child: MenuChild) => (
            <a key={child.label} href="#" className="block text-primary-blue-600 hover:text-black">{child.label}</a>
          ))}
        </div>
      )}
    </div>
  );
};