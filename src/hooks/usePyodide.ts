import { useEffect, useState, useCallback } from 'react';

interface PyodideInterface {
  loadPackage: (packages: string[]) => Promise<void>;
  runPython: (code: string) => any;
  globals: {
    get: (name: string) => any;
    set: (name: string, value: any) => void;
  };
}

declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<PyodideInterface>;
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        setLoading(true);

        // Load Pyodide script if not already loaded
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src =
            'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
        });

        // Load required packages
        await pyodideInstance.loadPackage(['numpy', 'scipy']);

        setPyodide(pyodideInstance);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Pyodide');
      } finally {
        setLoading(false);
      }
    };

    initPyodide();
  }, []);

  const runPython = useCallback(
    (code: string) => {
      if (!pyodide) {
        throw new Error('Pyodide not loaded yet');
      }
      return pyodide.runPython(code);
    },
    [pyodide]
  );

  const setGlobal = useCallback(
    (name: string, value: any) => {
      if (!pyodide) {
        throw new Error('Pyodide not loaded yet');
      }
      pyodide.globals.set(name, value);
    },
    [pyodide]
  );

  const getGlobal = useCallback(
    (name: string) => {
      if (!pyodide) {
        throw new Error('Pyodide not loaded yet');
      }
      return pyodide.globals.get(name);
    },
    [pyodide]
  );

  return {
    pyodide,
    loading,
    error,
    runPython,
    setGlobal,
    getGlobal,
    isReady: !loading && !error && pyodide !== null,
  };
};
