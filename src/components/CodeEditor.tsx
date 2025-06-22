import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  height?: string;
  readOnly?: boolean;
  title?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '', 
  height = '300px',
  readOnly = false,
  title = 'Éditeur JavaScript'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update code when initialCode changes
  useEffect(() => {
    setCode(initialCode);
    setOutput(''); // Clear output when code changes
  }, [initialCode]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    // Create a custom console object to capture output
    const customConsole = {
      log: (...args: any[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        setOutput(prev => prev + message + '\n');
      },
      error: (...args: any[]) => {
        const message = args.map(arg => String(arg)).join(' ');
        setOutput(prev => prev + '❌ Error: ' + message + '\n');
      },
      warn: (...args: any[]) => {
        const message = args.map(arg => String(arg)).join(' ');
        setOutput(prev => prev + '⚠️ Warning: ' + message + '\n');
      }
    };

    try {
      // Create a function that runs the user code with custom console
      const wrappedCode = `
        (function() {
          const console = arguments[0];
          ${code}
        })
      `;
      
      const func = eval(wrappedCode);
      func(customConsole);
    } catch (error) {
      setOutput(prev => prev + '❌ Erreur: ' + (error as Error).message + '\n');
    }

    setTimeout(() => setIsRunning(false), 500);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-white font-medium">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyCode}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            title="Copier le code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={resetCode}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning || readOnly}
            className={`flex items-center space-x-1 px-4 py-1.5 text-sm rounded transition-colors font-medium ${
              readOnly 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isRunning
                ? 'bg-purple-600 text-white cursor-wait'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Exécution...' : 'Exécuter'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ height }}
            placeholder="// Écrivez votre code JavaScript ici..."
            readOnly={readOnly}
            spellCheck={false}
          />
        </div>

        <div className="bg-gray-900 border-l border-gray-700">
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-white text-sm font-medium">Sortie Console</span>
          </div>
          <pre 
            className="p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap overflow-y-auto"
            style={{ height: `calc(${height} - 40px)` }}
          >
            {output || '// La sortie de votre code apparaîtra ici'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;