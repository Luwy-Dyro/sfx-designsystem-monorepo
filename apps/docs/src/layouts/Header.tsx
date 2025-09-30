import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4 rounded-lg mb-8">
      <div className="flex items-center justify-between">
        {/* Título a la izquierda */}
        <h1 className="text-xl font-bold text-gray-800">
          Clínica San Felipe - Design System
        </h1>

        {/* Sección de usuario a la derecha */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600" />
            {/* Círculo de notificación */}
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Reemplaza la URL con la imagen de perfil que desees */}
            <img 
              src="https://i.pravatar.cc/40?u=erickacosta" // Un avatar de ejemplo
              alt="Avatar de Erick Acosta"
              className="h-10 w-10 rounded-full border-2 border-gray-200"
            />
            <div>
              <p className="font-semibold text-gray-800">Erick Acosta</p>
              <span className="text-xs text-gray-500">UX/UI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};