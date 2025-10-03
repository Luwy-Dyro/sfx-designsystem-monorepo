import { useState } from 'react';
import type React from 'react';
import { ChevronDown, Home, Palette, Puzzle, Component } from 'lucide-react'; 

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
  { label: 'Fundamentos Visuales', icon: Palette, children: [{ label: 'Colores' }, { label: 'Tipografía' }] },
  { label: 'UI Atómico', icon: Puzzle, children: [{ label: 'Botones' }, { label: 'Otros componentes' }] },
  { label: 'Componentes complejos', icon: Component, children: [{ label: 'Botones' }, { label: 'Otros componentes' }] },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`bg-white text-primary-blue-600
         border border-primary-blue-600 rounded-lg overflow-auto
         mt-5 flex flex-col
         transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-2 mb-6">
        {/* Aquí puedes poner el logo */}
        <div className="w-10 h-22 bg-blue-800 rounded-t-md shrink-0 min-w-full
          flex justify-center items-center 
        ">
          <img src="./Logotipo_SF-dark.svg" alt="LogoTipo" className='h-10' />
        </div>
        {isExpanded && <h1 className="font-bold text-blue-800 text-lg">Clínica San Felipe</h1>}
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(item => <NavItem key={item.label} item={item} isExpanded={isExpanded} />)}
      </nav>
    </aside>
  );
};

// Sub-componente para cada item del menú
const NavItem = ({ item, isExpanded }: { item: MenuItem; isExpanded: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div 
        className="flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <item.icon className="h-6 w-6 shrink-0" />
        {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
        {isExpanded && item.children && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </div>
      {isOpen && isExpanded && item.children && (
        <div className="pl-10 pt-2 space-y-2">
          {item.children.map((child: MenuChild) => (
            <a key={child.label} href="#" className="block text-gray-600 hover:text-black">{child.label}</a>
          ))}
        </div>
      )}
    </div>
  );
};