export const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Un sistema de diseño integral...</h1>
      <p className="text-gray-600 mt-2">...que garantiza coherencia, accesibilidad y eficiencia.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-lime-200 p-6 rounded-xl text-center">
          <span className="text-3xl font-bold">+25</span>
          <p>Design Tokens</p>
        </div>
        <div className="bg-lime-200 p-6 rounded-xl text-center">
          <span className="text-3xl font-bold">+25</span>
          <p>Componentes</p>
        </div>
        <div className="bg-lime-200 p-6 rounded-xl text-center">
          <span className="text-3xl font-bold">+25</span>
          <p>Ejemplo de códigos</p>
        </div>
      </div>

      {/* Aquí irían las demás secciones como "Propósito y alcance" */}
    </div>
  )
}