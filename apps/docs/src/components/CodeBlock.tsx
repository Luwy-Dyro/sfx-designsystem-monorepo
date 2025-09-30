import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative group">
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '0.5rem', margin: 0 }}>
        {code}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-sans rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};