import { useNavigate } from 'react-router-dom'



export const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = (event: React.FormEvent) => {
     event.preventDefault(); 
        navigate('/'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-green-50 p-4 bg-[url(/Background-Texture.svg)]">
      
      <div className="bg-white relative  rounded-lg border-primary-green-600 border-2 shadow-lg w-[430px]  text-center px-5 sm:px-10 pb-10 pt-10">
      
        <div className="mx-auto flex items-center justify-center -mt-27 mb-5 ">
          <img src="/Logo_SF.svg" alt="Clinica San Felipe" width={138} height={138} loading="lazy" decoding="async" />
        </div>
        
        <h1 className="title-h1 text-primary-blue-600">Design System</h1>
        <p className=" body-1 text-primary-blue-600 mt-2 mb-7">Sistema de diseño de la Clínica San Felipe</p>
        
         <form className="space-y-4 text-left" onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="label-1 text-primary-blue-600 mb-1 block" htmlFor="usuario">Usuario</label>
           
              <div  className="relative">
               <input 
              id="usuario"
              type="text" 
              placeholder="Escribe tu usuario" 
              className="
              body w-full
              text-primary-blue-600 placeholder:text-primary-blue-600 
              bg-white
              border-2 border-primary-blue-600
              rounded-md
              pl-12 pr-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600
              " 
              />
             <span
              className="
                pointer-events-none
                absolute left-4 top-1/2 -translate-y-1/2
                grid place-items-center
                h-6 w-6 
                "
                >
              <img src="./icons/icon-logueo.svg" alt="" className="w-full" aria-hidden="true" />
            </span>
              </div>
        
          </div>
          <div className="mb-3" >
            <label className="label-1 text-primary-blue-600 mb-1 block" htmlFor="contrasena">Contraseña</label>
            <div  className="relative">

            <input 
              id="contrasena"
              name="contrasena"
              type="password" 
              placeholder="Escribe tu contraseña" 
              className="
              body w-full
              text-primary-blue-600 placeholder:text-primary-blue-600 
              bg-white
              border-2 border-primary-blue-600
              rounded-md
              pl-12 pr-4 py-2.5
              focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600
              " 
              />
             <span
              className="
                pointer-events-none
                absolute left-4 top-1/2 -translate-y-1/2
                grid place-items-center
                h-6 w-6 
                "
                >
              <img src="./icons/icon-logueo.svg" alt="" className="w-full" aria-hidden="true" />
            </span>
            
              </div>
          </div>
          <button 
            type="submit" 
            className="w-full 
            bg-primary-blue-600 text-white text-xl font-medium mt-5  p-3 rounded-md  hover:bg-primary-green-600 transition-colors
            cursor-pointer
            "

          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};