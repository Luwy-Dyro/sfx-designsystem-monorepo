import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

// 1. Definimos las variantes del botón usando CVA
// Aquí es donde usamos las clases de Tailwind que se conectan a nuestros tokens.
// Por ejemplo, "bg-primary-500" debería corresponder a un token de color.
const buttonVariants = cva(
  // Clases base que todos los botones comparten
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none",
  {
    variants: {
      // Variante de intención (color)
      intent: {
        primary: "bg-blue-500 text-white hover:bg-blue-600", // Cambia 'blue-500' por tu token de color primario
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300", // Cambia por tu token secundario
      },
      // Variante de tamaño
      size: {
        small: "h-9 px-2",
        medium: "h-10 px-4 py-2",
        large: "h-11 px-8",
      },
    },
    // Valores por defecto si no se especifica una variante
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

// 2. Definimos las Props del componente en TypeScript
// Heredamos las variantes de CVA y las props estándar de un botón HTML
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 3. Creamos el componente React
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        // clsx combina las clases de las variantes con cualquier otra clase que se le pase
        className={clsx(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";