import { ShieldCheck } from 'lucide-react'; // O el ícono de tu logo

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50" style={{ background: 'url(tu-fondo.svg)' }}>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <div className="mx-auto h-16 w-16 bg-green-200 text-blue-800 flex items-center justify-center rounded-full mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-xl font-bold">Design System</h1>
        <p className="text-gray-500 mb-6">Sistema de diseño de la Clínica San Felipe</p>
        
        <form className="space-y-4">
          <input type="text" placeholder="Usuario" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Contraseña" className="w-full p-3 border rounded-lg" />
          <button type="submit" className="w-full bg-blue-800 text-white p-3 rounded-lg font-bold hover:bg-blue-900">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};