/**
 * Favorites — Page des éléments favoris
 *
 * Affiche tous les éléments marqués comme favoris par l'utilisateur.
 * Permet de retirer un élément des favoris et de naviguer vers son module.
 */
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { IconStarFilled, IconStar, IconBookOpen, IconClipboardList, IconFlask, IconFileCheck, IconArrowRight } from '../components/Icons';
import ModuleIcon from '../components/ModuleIcon';
import './Favorites.css';

function Favorites() {
  const { modules, favorites, toggleFavorite } = useData();

  // Construire la liste enrichie des favoris
  const favoriteItems = favorites.reduce((acc, elementId) => {
    for (const mod of modules) {
      const el = mod.elements.find(e => e.id === elementId);
      if (el) {
        acc.push({ element: el, module: mod });
        break;
      }
    }
    return acc;
  }, []);

  return (
    <div className="favorites-page">
      {/* Header */}
      <div className="fav-header">
        <div className="fav-header__icon"><IconStarFilled size={28} /></div>
        <div>
          <h1 className="fav-header__title">Mes Favoris</h1>
          <p className="fav-header__subtitle">
            {favoriteItems.length} élément{favoriteItems.length !== 1 ? 's' : ''} sauvegardé{favoriteItems.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Contenu */}
      {favoriteItems.length === 0 ? (
        <div className="fav-empty">
          <span className="fav-empty__icon"><IconStar size={48} /></span>
          <h2 className="fav-empty__title">Aucun favori pour l'instant</h2>
          <p className="fav-empty__text">
            Marquez des éléments depuis les pages de modules pour les retrouver ici.
          </p>
          <Link to="/modules" className="btn btn-primary">
            Parcourir les modules
          </Link>
        </div>
      ) : (
        <div className="fav-grid">
          {favoriteItems.map(({ element, module }, idx) => (
            <div
              key={element.id}
              className="fav-card"
              style={{ '--delay': `${idx * 60}ms` }}
            >
              {/* Couleur module */}
              <div className="fav-card__accent" style={{ background: module.color }} />

              {/* Icône module */}
              <div className="fav-card__icon" style={{ '--mod-color': module.color }}>
                <ModuleIcon name={module.icon} size={24} />
              </div>

              {/* Infos */}
              <div className="fav-card__body">
                <h3 className="fav-card__element-title">{element.title}</h3>
                <p className="fav-card__module-name">{module.title}</p>
                <p className="fav-card__desc">{element.description}</p>

                {/* Compte documents */}
                <div className="fav-card__stats">
                  {['cours', 'td', 'tp', 'examens'].map(key => {
                    const count = element.rubriques[key]?.length || 0;
                    if (count === 0) return null;
                    const labelIcons = {
                      cours: <><IconBookOpen size={12} /> Cours</>,
                      td: <><IconClipboardList size={12} /> TD</>,
                      tp: <><IconFlask size={12} /> TP</>,
                      examens: <><IconFileCheck size={12} /> Examens</>
                    };
                    return (
                      <span key={key} className="fav-card__stat-badge">
                        {labelIcons[key]}: {count}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="fav-card__actions">
                <Link
                  to={`/module/${module.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Ouvrir <IconArrowRight size={12} />
                </Link>
                <button
                  className="fav-card__remove-btn"
                  onClick={() => toggleFavorite(element.id)}
                  title="Retirer des favoris"
                >
                  <IconStarFilled size={14} /> Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
