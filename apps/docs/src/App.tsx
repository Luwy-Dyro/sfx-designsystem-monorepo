import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { DashboardLayout } from './layouts/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />}>
        {/* Rutas anidadas que se mostrarán dentro del DashboardLayout */}
        <Route index element={<HomePage />} />
        {/* Ejemplo: <Route path="colores" element={<PaginaDeColores />} /> */}
      </Route>
    </Routes>
  );
}

export default App;


// import { 
//   Button, 
//   Card, 
//   CardHeader, 
//   CardTitle, 
//   CardBody, 
//   CardFooter 
// } from "@repo/ui";
// import { CodeBlock } from "./components/CodeBlock";

// // Definimos los strings de código que queremos mostrar
// const buttonCode = {
//   primary: `<Button intent="primary">Primary Button</Button>`,
//   secondary: `<Button intent="secondary" size="large">Large Secondary</Button>`,
//   small: `<Button intent="primary" size="small">Small Button</Button>`,
// };


// const cardCode = 
// `<Card>
//   <CardHeader>
//     <CardTitle>Card Title</CardTitle>
//   </CardHeader>
//   <CardBody>
//     <p>This is the body of the card.</p>
//   </CardBody>
//   <CardFooter>
//     <Button intent="secondary" size="small">
//       View Details
//     </Button>
//   </CardFooter>
// </Card>`;



// function App() {
//   return (
//     <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center p-8 text-white">
//       <header className="mb-12">
//         <h1 className="text-5xl font-bold text-sky-400 text-center">
//           🚀 Mi Design System
//         </h1>
//         <p className="text-slate-400 mt-4 text-center">
//           Componente: Button
//         </p>
//       </header>

//        <main className="w-full max-w-4xl space-y-10">
//         {/* --- Sección de Botones --- */}
//         <div>
//           <h2 className="text-2xl font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Componente: Button</h2>
//           <div className="space-y-8 mt-4">
//             <ComponentShowcase
//               title="Botón Primario (Default)"
//               code={buttonCode.primary}
//             >
//               <Button intent="primary">Primary Button</Button>
//             </ComponentShowcase>
//             <ComponentShowcase
//               title="Botón Secundario Grande"
//               code={buttonCode.secondary}
//             >
//               <Button intent="secondary" size="large">Large Secondary</Button>
//             </ComponentShowcase>
//           </div>
//         </div>

//         {/* --- Nueva Sección de Card --- */}
//         <div>
//           <h2 className="text-2xl font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Componente: Card</h2>
//           <div className="mt-4">
//             <ComponentShowcase
//               title="Card Básica con Composición"
//               code={cardCode}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Título de la Card</CardTitle>
//                 </CardHeader>
//                 <CardBody>
//                   <p className="text-slate-400">Este es el cuerpo de la card donde va el contenido principal.</p>
//                 </CardBody>
//                 <CardFooter>
//                   <Button intent="secondary" size="small">
//                     Ver Detalles
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </ComponentShowcase>
//           </div>
//         </div>
//       </main>
      
//     </div>
//   );

// }

// // Un pequeño componente auxiliar para no repetir código
// function ComponentShowcase({ title, code, children }: { title: string, code: string, children: React.ReactNode }) {
//   return (
//     <div className="bg-slate-800/50 rounded-lg p-6">
//       <h3 className="text-xl font-semibold text-slate-300 mb-4">{title}</h3>
//       <div className="grid grid-cols-2 gap-6 items-center">
//         {/* Columna 1: Componente Renderizado */}
//         <div className="flex items-center justify-center h-full min-h-24 p-4 bg-slate-900/50 rounded-lg">
//           {children}
//         </div>
//         {/* Columna 2: Bloque de Código */}
//         <div>
//           <CodeBlock code={code} />
//         </div>
//       </div>
//     </div>
//   );
// }


// export default App;