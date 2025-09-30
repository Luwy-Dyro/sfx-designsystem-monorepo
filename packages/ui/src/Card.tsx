import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

// --- Definición de las Variantes de la Card ---
const cardVariants = cva(
  // Clases base
  "rounded-lg shadow-md overflow-hidden",
  {
    variants: {
      // Variante para el padding interior
      padding: {
        none: "p-0",
        normal: "p-6",
        loose: "p-8",
      },
      // Variante para el borde
      border: {
        none: "border-none",
        subtle: "border border-slate-700/50",
      },
      // Variante para el fondo
      background: {
        default: "bg-slate-800",
        muted: "bg-slate-800/50",
      },
    },
    // Valores por defecto
    defaultVariants: {
      padding: "normal",
      border: "subtle",
      background: "default",
    },
  }
);

// --- Props del Componente Card ---
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

// --- Componente Principal Card ---
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, border, background, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(cardVariants({ padding, border, background, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

// --- Sub-componentes para una mejor estructura ---

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("p-6 border-b border-slate-700/50", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx("text-lg font-semibold leading-none tracking-tight text-white", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("p-6", className)} {...props} />
));
CardBody.displayName = "CardBody";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Exportamos todo junto
export { Card, CardHeader, CardTitle, CardBody, CardFooter };