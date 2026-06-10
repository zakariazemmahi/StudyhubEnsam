/**
 * Sidebar — Menu latéral fixe
 * 
 * Navigation principale avec liens, documents récents et favoris.
 * Collapsible en overlay sur mobile.
 */
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  IconHome, IconGrid, IconStarFilled, IconStar, IconClock, IconInfo,
  IconFileText, IconBook, IconUnlock, IconX, IconDownload
} from './Icons';
import ModuleIcon from './ModuleIcon';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { recentItems, favorites, modules, isAdmin, logoutAdmin, exportConfig } = useData();

  // Vérifier si un lien est actif
  const isActive = (path) => location.pathname === path;

  // Trouver le titre d'un élément favori
  const getFavoriteInfo = (elementId) => {
    for (const mod of modules) {
      const el = mod.elements.find(e => e.id === elementId);
      if (el) return { title: el.title, moduleId: mod.id, icon: mod.icon };
    }
    return null;
  };

  return (
    <>
      {/* Overlay sombre sur mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        {/* Logo */}
        <Link to="/" className="sidebar-logo" onClick={onClose}>
          <span className="sidebar-logo__icon"><IconHome size={22} /></span>
          <div className="sidebar-logo__text">
            <span className="sidebar-logo__name">StudyHub</span>
            <span className="sidebar-logo__accent">ENSAM</span>
          </div>
        </Link>

        {/* Bouton fermer (mobile) */}
        <button className="sidebar-close" onClick={onClose} aria-label="Fermer le menu">
          <IconX size={18} />
        </button>

        {/* Navigation principale */}
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <span className="sidebar-section__label">Navigation</span>
            <Link
              to="/"
              className={`sidebar-link ${isActive('/') ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link__icon"><IconHome size={18} /></span>
              <span>Accueil</span>
            </Link>
            <Link
              to="/modules"
              className={`sidebar-link ${isActive('/modules') ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link__icon"><IconGrid size={18} /></span>
              <span>Modules</span>
            </Link>
            <Link
              to="/favoris"
              className={`sidebar-link ${isActive('/favoris') ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link__icon"><IconStarFilled size={18} /></span>
              <span>Favoris</span>
              {favorites.length > 0 && (
                <span className="sidebar-link__badge">{favorites.length}</span>
              )}
            </Link>
            <Link
              to="/recents"
              className={`sidebar-link ${isActive('/recents') ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link__icon"><IconClock size={18} /></span>
              <span>Récents</span>
              {recentItems.length > 0 && (
                <span className="sidebar-link__badge">{recentItems.length}</span>
              )}
            </Link>
            <Link
              to="/about"
              className={`sidebar-link ${isActive('/about') ? 'sidebar-link--active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link__icon"><IconInfo size={18} /></span>
              <span>À propos</span>
            </Link>
          </div>

          {/* Documents récents */}
          <div className="sidebar-section">
            <span className="sidebar-section__label"><IconFileText size={14} /> Documents récents</span>
            {recentItems.length === 0 ? (
              <p className="sidebar-empty">Aucun document récent</p>
            ) : (
              recentItems.slice(0, 5).map((item, idx) => (
                <Link
                  key={idx}
                  to={`/module/${item.moduleId || item.id}`}
                  className="sidebar-link sidebar-link--small"
                  onClick={onClose}
                >
                  <span className="sidebar-link__icon sidebar-link__icon--small">
                    {item.type === 'module' ? <IconBook size={14} /> : <IconFileText size={14} />}
                  </span>
                  <span className="sidebar-link__text-truncate">{item.title}</span>
                </Link>
              ))
            )}
          </div>

          {/* Favoris */}
          <div className="sidebar-section">
            <span className="sidebar-section__label"><IconStarFilled size={14} /> Favoris</span>
            {favorites.length === 0 ? (
              <p className="sidebar-empty">Aucun favori</p>
            ) : (
              favorites.slice(0, 5).map(elId => {
                const info = getFavoriteInfo(elId);
                if (!info) return null;
                return (
                  <Link
                    key={elId}
                    to={`/module/${info.moduleId}`}
                    className="sidebar-link sidebar-link--small"
                    onClick={onClose}
                  >
                    <span className="sidebar-link__icon sidebar-link__icon--small">
                      <ModuleIcon name={info.icon} size={14} />
                    </span>
                    <span className="sidebar-link__text-truncate">{info.title}</span>
                  </Link>
                );
              })
            )}
          </div>
        </nav>

        {/* Section admin */}
        {isAdmin && (
          <div className="sidebar-admin">
            <div className="sidebar-admin__badge">
              <span><IconUnlock size={16} /></span>
              <span>Mode Admin</span>
            </div>
            <button className="sidebar-admin__btn" onClick={exportConfig} title="Exporter la configuration modules.js">
              <span><IconDownload size={16} /></span>
              <span>Exporter modules.js</span>
            </button>
            <button className="sidebar-admin__logout" onClick={logoutAdmin}>
              Déconnexion
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
