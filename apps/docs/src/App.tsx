import { Button } from "@repo/ui";
import { CodeBlock } from "./components/CodeBlock";

// Definimos los strings de código que queremos mostrar
const buttonCode = {
  primary: `<Button intent="primary">Primary Button</Button>`,
  secondary: `<Button intent="secondary" size="large">Large Secondary</Button>`,
  small: `<Button intent="primary" size="small">Small Button</Button>`,
};

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center p-8 text-white">
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-sky-400 text-center">
          🚀 Mi Design System
        </h1>
        <p className="text-slate-400 mt-4 text-center">
          Componente: Button
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        {/* Mostramos el primer ejemplo */}
        <ComponentShowcase
          title="Botón Primario (Default)"
          code={buttonCode.primary}
        >
          <Button intent="primary">Primary Button</Button>
        </ComponentShowcase>

        {/* Mostramos el segundo ejemplo */}
        <ComponentShowcase
          title="Botón Secundario Grande"
          code={buttonCode.secondary}
        >
          <Button intent="secondary" size="large">Large Secondary</Button>
        </ComponentShowcase>
        
        {/* Mostramos el tercer ejemplo */}
         <ComponentShowcase
          title="Botón Primario Pequeño"
          code={buttonCode.small}
        >
          <Button intent="primary" size="small">Small Button</Button>
        </ComponentShowcase>
      </main>
    </div>
  );
}

// Un pequeño componente auxiliar para no repetir código
function ComponentShowcase({ title, code, children }: { title: string, code: string, children: React.ReactNode }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-slate-300 mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Columna 1: Componente Renderizado */}
        <div className="flex items-center justify-center h-24 bg-slate-900/50 rounded-lg">
          {children}
        </div>
        {/* Columna 2: Bloque de Código */}
        <div>
          <CodeBlock code={code} />
        </div>
      </div>
    </div>
  );
}


export default App;