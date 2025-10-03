import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-primary-green-600 shadow-sm px-6 py-3.5 rounded-lg mb-10">
      <div className="flex items-center justify-between">
        
        <h1 className="text-3xl font-bold text-white">
          Clínica San Felipe - Design System
        </h1>

        
        <div className="flex items-center gap-7">
          <div className="relative">
            <Bell className="h-4 w-4 text-primary-blue-600" />
            
            <span className="absolute -top-3 -right-3 block h-4 w-4 rounded-full bg-[#B3261E]  text-xs text-white text-center font-medium">0</span>
          </div>
          
          <div className="flex items-center gap-2">
        
            <img src="https://i.pravatar.cc/40?u=erickacosta" 
              alt="Avatar de Erick Acosta"
              className="h-10 w-10 rounded-full border-2 border-gray-200"
            />
            <div className='flex flex-col justify-center'>
              <p className="font-semibold text-white">Erick Acosta</p>
              <span className="text-xs font-medium text-primary-blue-500 -mt-1">UX/UI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};