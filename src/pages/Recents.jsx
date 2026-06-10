/**
 * Recents — Page de l'historique de navigation
 *
 * Affiche les 10 derniers modules/éléments visités.
 * Permet de vider l'historique.
 */
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { IconClock, IconTrash, IconArrowRight, IconBook } from '../components/Icons';
import ModuleIcon from '../components/ModuleIcon';
import './Recents.css';

function Recents() {
  const { recentItems, modules, setRecentItems } = useData();

  // Enrichir chaque item avec les infos du module
  const enrichedItems = recentItems.map(item => {
    const mod = modules.find(m => m.id === (item.moduleId || item.id));
    return { ...item, module: mod || null };
  });

  // Formater le temps relatif
  function timeAgo(timestamp) {
    if (!timestamp) return '';
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  }

  const handleClearHistory = () => {
    if (window.confirm('Vider tout l\'historique de navigation ?')) {
      setRecentItems([]);
      localStorage.removeItem('studyhub-recent');
    }
  };

  return (
    <div className="recents-page">
      {/* Header */}
      <div className="recents-header">
        <div className="recents-header__left">
          <div className="recents-header__icon"><IconClock size={28} /></div>
          <div>
            <h1 className="recents-header__title">Récemment visité</h1>
            <p className="recents-header__subtitle">
              {recentItems.length} élément{recentItems.length !== 1 ? 's' : ''} dans l'historique
            </p>
          </div>
        </div>
        {recentItems.length > 0 && (
          <button className="recents-clear-btn" onClick={handleClearHistory}>
            <IconTrash size={14} /> Vider l'historique
          </button>
        )}
      </div>

      {/* Contenu */}
      {enrichedItems.length === 0 ? (
        <div className="recents-empty">
          <span className="recents-empty__icon"><IconClock size={48} /></span>
          <h2 className="recents-empty__title">Aucune visite récente</h2>
          <p className="recents-empty__text">
            Votre historique de navigation apparaîtra ici au fur et à mesure de votre exploration.
          </p>
          <Link to="/modules" className="btn btn-primary">
            Commencer à explorer
          </Link>
        </div>
      ) : (
        <div className="recents-list">
          {enrichedItems.map((item, idx) => (
            <Link
              key={idx}
              to={`/module/${item.moduleId || item.id}`}
              className="recents-item"
              style={{ '--delay': `${idx * 50}ms` }}
            >
              {/* Icône */}
              <div
                className="recents-item__icon"
                style={{ '--mod-color': item.module?.color || '#4361ee' }}
              >
                {item.module ? <ModuleIcon name={item.module.icon} size={20} /> : <IconBook size={20} />}
              </div>

              {/* Infos */}
              <div className="recents-item__info">
                <span className="recents-item__title">{item.title}</span>
                {item.module && (
                  <span className="recents-item__module">{item.module.title}</span>
                )}
              </div>

              {/* Temps */}
              <div className="recents-item__right">
                <span className="recents-item__time">{timeAgo(item.timestamp)}</span>
                <span className="recents-item__type-badge">
                  {item.type === 'module' ? 'Module' : 'Élément'}
                </span>
                <span className="recents-item__arrow"><IconArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recents;
