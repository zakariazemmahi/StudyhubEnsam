/**
 * Navbar — Barre de navigation supérieure
 * 
 * Contient : recherche en temps réel, toggle dark mode, toggle admin, hamburger mobile.
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { IconSearch, IconX, IconSun, IconMoon, IconLock, IconUnlock, IconShieldLock, IconPlus } from './Icons';
import ModuleIcon from './ModuleIcon';
import CourseCreationModal from './CourseCreationModal';
import './Navbar.css';

function Navbar({ onToggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAdmin, loginAdmin, logoutAdmin, searchAll } = useData();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const searchRef = useRef(null);

  // Recherche en temps réel
  useEffect(() => {
    if (query.trim()) {
      const r = searchAll(query);
      setResults(r);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, searchAll]);

  // Fermer les résultats au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Naviguer vers un résultat
  const handleResultClick = (result) => {
    setQuery('');
    setShowResults(false);
    if (result.type === 'module') {
      navigate(`/module/${result.id}`);
    } else {
      navigate(`/module/${result.moduleId}`);
    }
  };

  // Login admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setShowPasswordPrompt(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Mot de passe incorrect');
    }
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      logoutAdmin();
    } else {
      setShowPasswordPrompt(true);
      setPasswordError('');
      setPassword('');
    }
  };

  return (
    <header className="navbar">
      {/* Hamburger mobile */}
      <button className="navbar-hamburger" onClick={onToggleSidebar} aria-label="Menu">
        <span className="navbar-hamburger__line" />
        <span className="navbar-hamburger__line" />
        <span className="navbar-hamburger__line" />
      </button>

      {/* Barre de recherche */}
      <div className="navbar-search" ref={searchRef}>
        <span className="navbar-search__icon"><IconSearch size={16} /></span>
        <input
          type="text"
          className="navbar-search__input"
          placeholder="Rechercher un module ou élément..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
        />
        {query && (
          <button
            className="navbar-search__clear"
            onClick={() => { setQuery(''); setShowResults(false); }}
            aria-label="Effacer"
          >
            <IconX size={14} />
          </button>
        )}

        {/* Dropdown résultats */}
        {showResults && (
          <div className="navbar-search__dropdown">
            {results.length > 0 ? (
              results.map((r, idx) => (
                <button
                  key={idx}
                  className="navbar-search__result"
                  onClick={() => handleResultClick(r)}
                >
                  <span className="navbar-search__result-icon">
                    <ModuleIcon name={r.icon} size={18} />
                  </span>
                  <div className="navbar-search__result-info">
                    <span className="navbar-search__result-title">{r.title}</span>
                    <span className="navbar-search__result-type">
                      {r.type === 'module' ? 'Module' : `Élément • ${r.moduleTitle}`}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="navbar-search__no-results">
                Aucun résultat pour « {query} »
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions à droite */}
      <div className="navbar-actions">
        {/* Create course button (admin only) */}
        {isAdmin && (
          <button
            className="navbar-action-btn navbar-action-btn--create"
            onClick={() => setShowCreateCourse(true)}
            aria-label="Créer un cours"
            title="Créer un nouveau cours"
          >
            <IconPlus size={18} />
          </button>
        )}

        {/* Dark mode toggle */}
        <button
          className="navbar-action-btn"
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
          title={darkMode ? 'Mode clair' : 'Mode sombre'}
        >
          <span className={`navbar-theme-icon ${darkMode ? 'navbar-theme-icon--dark' : ''}`}>
            {darkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
          </span>
        </button>

        {/* Admin toggle */}
        <button
          className={`navbar-action-btn ${isAdmin ? 'navbar-action-btn--admin' : ''}`}
          onClick={handleAdminToggle}
          aria-label={isAdmin ? 'Déconnexion admin' : 'Mode admin'}
          title={isAdmin ? 'Déconnexion admin' : 'Mode admin'}
        >
          {isAdmin ? <IconUnlock size={18} /> : <IconLock size={18} />}
        </button>
      </div>

      {/* Modal mot de passe admin */}
      {showPasswordPrompt && (
        <div className="navbar-password-overlay" onClick={() => setShowPasswordPrompt(false)}>
          <form
            className="navbar-password-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAdminLogin}
          >
            <h3><IconShieldLock size={20} /> Accès Administrateur</h3>
            <p>Entrez le mot de passe admin</p>
            <input
              type="password"
              className="navbar-password-input"
              placeholder="Mot de passe..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {passwordError && <span className="navbar-password-error">{passwordError}</span>}
            <div className="navbar-password-actions">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowPasswordPrompt(false)}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Connexion
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de création de cours */}
      <CourseCreationModal
        isOpen={showCreateCourse}
        onClose={() => setShowCreateCourse(false)}
      />
    </header>
  );
}

export default Navbar;
