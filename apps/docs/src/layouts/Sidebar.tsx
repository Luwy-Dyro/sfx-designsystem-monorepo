import { useState, useEffect  } from 'react';
import type React from 'react';
import { ChevronDown, Home, Palette, Puzzle, Component, ChevronLeft, Calendar  } from 'lucide-react'; 
import { useNavigate, useLocation, Link} from 'react-router-dom';


type MenuChild = {
  label: string;
  href?: string;
};

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }> ;
  href?: string;
  children?: MenuChild[];
};

type MenuSection = {
  title: string;
  items: MenuItem[]; // Esto le dice a TS que 'items' SIEMPRE es un arreglo de MenuItem
};

const homeItem: MenuItem = { label: 'Home', icon: Home, href: '/' };

const menuSections: MenuSection[] = [
  {
    title: 'MENU',
    items: [
      { 
        label: 'Fundamentos Visuales', 
        icon: Palette,
        children: [
          { label: 'Colores' },
          { label: 'Tipografías' },
          { label: 'Grids y Espacios' },
          { label: 'Bordes y sombras' },
          { label: 'Iconografía' }
        ]
      },
      { 
        label: 'UI Atómico', 
        icon: Puzzle,
        children: [
          { label: 'Botones' }, 
          { label: 'Otros componentes' }
        ] 
      },
      { 
        label: 'Componentes complejos', 
        icon: Component, 
        children: [
          { label: 'Botones' },
          { label: 'Otros componentes' }
        ]
      },
    ]
  },
  {
    title: 'RECURSOS',
    items: [
      { label: 'Tokens', icon: Calendar, href: '/tokens' },
      { label: 'Accesibilidad', icon: Calendar, href: '/accesibilidad' },
      { label: 'Contenido y Tono', icon: Calendar, href: '/contenido' },
      { label: 'Recursos de desarrollador', icon: Calendar, href: '/recursos' },
    ]
  },
  {
    title: 'HERRAMIENTAS',
    items: [
      { label: 'Historial de cambios', icon: Calendar, href: '/historial' },
      { label: 'Configuración', icon: Calendar, href: '/configuracion' },
   
      { label: 'Ayuda y comentarios', icon: Calendar, href: '/ayuda' }, 
    ]
  }
];


export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [openItemLabel, setOpenItemLabel] = useState<string | null>('Fundamentos Visuales'); 
  
  const location = useLocation();

  useEffect(() => {
    // Buscamos si la URL actual corresponde a un item SIN hijos
    const currentItem = menuSections
      .flatMap(section => section.items)
      .find(item => item.href === location.pathname);

    // Si navegamos a un enlace directo (como Home o uno sin 'children'), cerramos el menú.
    if ((currentItem && !currentItem.children) || location.pathname === homeItem.href) {
      setOpenItemLabel(null);
    }
  }, [location]); // Se ejecuta cada vez que la URL cambia

  
  const handleItemClick = (label: string) => {

    setOpenItemLabel(prevLabel => (prevLabel ===label ? null : label))

  }

  return (
    <aside
      className={`bg-white text-primary-blue-600
         border border-primary-blue-600 rounded-lg overflow-auto
         mt-6 ml-9 flex flex-col
         transition-all duration-300 ${isExpanded ? 'w-64' : 'w-23'} sticky top-6 z-1001` }
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

        
        <NavItem 
          item={homeItem} 
          isExpanded={isExpanded}
          isOpen={false}
          onClick={() => {}}
          >

          
          </NavItem>
          
          {menuSections.map(section => (

            <div key={section.title}>

              
                <b className={`flex justify-center pt-4 pb-2 text-[0.625rem] font-bold uppercase text-primary-blue-600
                  ${ isExpanded ? 'px-2 justify-start' : ''}
                
                `}>
                  {isExpanded 
                    ? section.title
                    : section.title.length > 4 
                      ? section.title.substring(0,3) + '...'
                      : section.title 
                    }  
                </b>
              
              {section.items.map(item => (
                <NavItem 
                  key={item.label} 
                  item={item} 
                  isExpanded={isExpanded}
                  isOpen={openItemLabel === item.label}
                  onClick = { () => handleItemClick(item.label) }
                ></NavItem>
              ))}
              
          </div>
          ))}
      
      </nav>

        <div className="min-h-10 p-6 bg-primary-blue-600 rounded-b-md shrink-0 min-w-full mt-8">
         
        </div>
      


    </aside>
  );
};



// --- Tipo de las props para NavItem (actualizado) ---
type NavItemProps = {
  item: MenuItem;
  isExpanded: boolean;
  isOpen: boolean; 
  onClick: () => void; 
};

// --- Sub-componente NavItem (SIMPLIFICADO) ---
const NavItem = ({ item, isExpanded, isOpen, onClick }: NavItemProps) => {

  const navigate = useNavigate();  
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;
  
  
  const handleClick = () => {
   
    if (item.children) {
      onClick();
    }
    
    else if (item.href) {
      navigate(item.href);
    }
  };

  return (
 <>
      <div
        className={`flex items-center justify-between px-2 py-3 mb-2 rounded-md cursor-pointer transition-colors duration-150
          ${(isOpen || isActive)
            ? 'bg-primary-blue-50 text-primary-blue-700 font-semibold'
            : 'hover:bg-primary-blue-50'
          }
        `}
        onClick={handleClick}
      >
        <div className="flex items-center">
            <item.icon className="h-6 w-6 shrink-0" />
            {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
        </div>
        {isExpanded && item.children && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </div>
      
      {isOpen && isExpanded && item.children && (
        <div className="px-3 py-2 space-y-2">
          {item.children.map((child: MenuChild) => (
            
             <Link 
                key={child.label} 
                to={child.href || "#"} 
                className={`flex text-sm text-primary-blue-400 min-h-8 hover:text-primary-blue-600 m-0 justify-start items-center border-l-1 border-primary-blue-100 px-3
                    ${location.pathname === child.href 
                        ? 'text-primary-blue-600 font-semibold' 
                        : 'text-primary-blue-50 hover:text-primary-blue-600'
                    }`}
             >
                {child.label}
             </Link>
            //  <a key={child.label} href={child.href || "#"} className="flex text-sm text-primary-blue-400 min-h-8 hover:text-primary-blue-600 m-0 justify-start items-center border-l-1 border-primary-blue-400 px-3">{child.label}</a>
          ))}
        </div>
      )}
  </>
  );
};



// Sub-componente para cada item del menú
// const NavItem = ({ item, isExpanded }: { item: MenuItem; isExpanded: boolean }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     if(item.children){
//       setIsOpen(!isOpen)
//     }
//   }
//   return (
//     <div>
//       <div
//         className={`flex px-2  py-3 
//         justify-between rounded-md 
//         hover:bg-primary-blue-50
//         cursor-pointer transition-colors duration-150
//         ${isOpen
//           ? 'bg-primary-blue-50 text-primary-blue-700 font-semibold'
//           : 'hover:bg-primary-blue-50'

//         }
//         `}
//         // onClick={() => item.children && setIsOpen(!isOpen)}
//         onClick={handleClick}
//       >
//         <div className="flex items-center ">
//             <item.icon className="h-8 w-6 shrink-0" />
//             {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
//         </div>
//         {isExpanded && item.children && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
//       </div>
//       {isOpen && isExpanded && item.children && (
//         <div className="px-3  space-y-2">
//           {item.children.map((child: MenuChild) => (
//             <a key={child.label} href={child.href || "#"} className="flex text-sm text-primary-blue-400 min-h-8 hover:text-primary-blue-600 m-0 justify-start items-center border-l-1 border-primary-blue-400 px-3">{child.label}</a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };