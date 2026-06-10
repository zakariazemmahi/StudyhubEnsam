/**
 * DataContext — Gestion centralisée des données
 * 
 * Fournit :
 * - Modules (données par défaut + documents ajoutés par l'admin)
 * - Favoris (éléments favoris)
 * - Documents récents (historique de navigation)
 * - Mode admin (ajout/suppression de documents)
 * - Recherche (filtrage des modules et éléments)
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import modulesData from '../data/modules';

const DataContext = createContext();

export function DataProvider({ children }) {
  // ===== Documents ajoutés par l'admin (localStorage) =====
  const [adminDocs, setAdminDocs] = useState(() => {
    const saved = localStorage.getItem('studyhub-admin-docs');
    return saved ? JSON.parse(saved) : [];
  });

  // ===== Favoris =====
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('studyhub-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // ===== Documents récents =====
  const [recentItems, setRecentItems] = useState(() => {
    const saved = localStorage.getItem('studyhub-recent');
    return saved ? JSON.parse(saved) : [];
  });

  // ===== Mode admin =====
  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem('studyhub-admin');
    return saved ? JSON.parse(saved) : false;
  });

  // ===== Recherche =====
  const [searchQuery, setSearchQuery] = useState('');

  // ===== Persistance localStorage =====
  useEffect(() => {
    localStorage.setItem('studyhub-admin-docs', JSON.stringify(adminDocs));
  }, [adminDocs]);

  useEffect(() => {
    localStorage.setItem('studyhub-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('studyhub-recent', JSON.stringify(recentItems));
  }, [recentItems]);

  useEffect(() => {
    localStorage.setItem('studyhub-admin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  // ===== Fusion des données par défaut + admin =====
  const modules = useMemo(() => {
    // Deep clone des données par défaut
    const merged = JSON.parse(JSON.stringify(modulesData));

    // Injecter les documents admin dans les bonnes rubriques
    adminDocs.forEach(({ moduleId, elementId, rubriqueKey, document }) => {
      const mod = merged.find(m => m.id === moduleId);
      if (!mod) return;
      const el = mod.elements.find(e => e.id === elementId);
      if (!el) return;
      if (!el.rubriques[rubriqueKey]) el.rubriques[rubriqueKey] = [];
      // Éviter les doublons
      if (!el.rubriques[rubriqueKey].find(d => d.id === document.id)) {
        el.rubriques[rubriqueKey].push(document);
      }
    });

    return merged;
  }, [adminDocs]);

  // ===== Ajouter un document (admin) =====
  const addDocument = useCallback((moduleId, elementId, rubriqueKey, document) => {
    setAdminDocs(prev => [...prev, { moduleId, elementId, rubriqueKey, document }]);
  }, []);

  // ===== Supprimer un document admin =====
  const removeDocument = useCallback((moduleId, elementId, rubriqueKey, docId) => {
    setAdminDocs(prev => prev.filter(d =>
      !(d.moduleId === moduleId && d.elementId === elementId &&
        d.rubriqueKey === rubriqueKey && d.document.id === docId)
    ));
  }, []);

  // ===== Favoris =====
  const toggleFavorite = useCallback((elementId) => {
    setFavorites(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  }, []);

  const isFavorite = useCallback((elementId) => {
    return favorites.includes(elementId);
  }, [favorites]);

  // ===== Récents =====
  const addRecent = useCallback((item) => {
    setRecentItems(prev => {
      // Retirer l'ancien si même ID
      const filtered = prev.filter(r => !(r.type === item.type && r.id === item.id));
      // Ajouter en tête (max 10)
      return [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 10);
    });
  }, []);

  // ===== Admin login/logout =====
  const loginAdmin = useCallback((password) => {
    if (password === 'ensam2026') {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
  }, []);

  // ===== Recherche filtrée =====
  const getFilteredModules = useCallback(() => {
    if (!searchQuery.trim()) return modules;
    const query = searchQuery.toLowerCase().trim();
    return modules.filter(mod =>
      mod.title.toLowerCase().includes(query) ||
      mod.elements.some(el => el.title.toLowerCase().includes(query))
    );
  }, [modules, searchQuery]);

  // ===== Recherche globale (retourne modules + éléments matchés) =====
  const searchAll = useCallback((query) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results = [];

    modules.forEach(mod => {
      if (mod.title.toLowerCase().includes(q)) {
        results.push({ type: 'module', id: mod.id, title: mod.title, icon: mod.icon });
      }
      mod.elements.forEach(el => {
        if (el.title.toLowerCase().includes(q)) {
          results.push({
            type: 'element',
            id: el.id,
            title: el.title,
            moduleId: mod.id,
            moduleTitle: mod.title,
            icon: mod.icon,
          });
        }
      });
    });

    return results.slice(0, 8);
  }, [modules]);

  const value = {
    modules,
    favorites,
    recentItems,
    isAdmin,
    searchQuery,
    addDocument,
    removeDocument,
    toggleFavorite,
    isFavorite,
    addRecent,
    setRecentItems,
    loginAdmin,
    logoutAdmin,
    setSearchQuery,
    getFilteredModules,
    searchAll,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

/** Hook personnalisé pour accéder aux données */
export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData doit être utilisé dans un DataProvider');
  return context;
}
