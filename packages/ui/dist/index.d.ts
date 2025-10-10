import { JSX } from 'react/jsx-runtime';
import { JSX as JSX_2 } from 'react';
import { ReactNode } from 'react';

export declare const Button: ({ children, className, appName }: ButtonProps) => JSX.Element;

declare interface ButtonProps {
    children: ReactNode;
    className?: string;
    appName: string;
}

export declare function Card({ className, title, children, href, }: {
    className?: string;
    title: string;
    children: React.ReactNode;
    href: string;
}): JSX_2.Element;

export { }
