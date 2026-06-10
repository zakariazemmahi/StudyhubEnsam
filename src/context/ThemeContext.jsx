/**
 * ThemeContext — Gestion du thème clair/sombre
 * 
 * Persiste la préférence dans localStorage.
 * Ajoute/retire la classe 'dark-mode' sur document.body.
 */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Lire la préférence sauvegardée (défaut : clair)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('studyhub-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Appliquer la classe sur le body et sauvegarder
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('studyhub-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook personnalisé pour accéder au thème */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  return context;
}
