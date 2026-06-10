/**
 * Modules — Page listant tous les modules du semestre
 * 
 * Affiche une grille de ModuleCard avec filtrage par recherche.
 */
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { IconSearch, IconX, IconInbox } from '../components/Icons';
import ModuleCard from '../components/ModuleCard';
import './Modules.css';

function Modules() {
  const { modules } = useData();
  const [filter, setFilter] = useState('');

  // Filtrer les modules par titre
  const filteredModules = modules.filter(mod =>
    mod.title.toLowerCase().includes(filter.toLowerCase()) ||
    mod.elements.some(el => el.title.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="modules-page">
      {/* Header */}
      <div className="modules-header">
        <div className="modules-header__text">
          <h1 className="modules-header__title">
            Modules <span className="modules-header__accent">— Semestre</span>
          </h1>
          <p className="modules-header__subtitle">
            Explorez tous les modules de la filière IATD-SI
          </p>
        </div>

        {/* Filtre de recherche */}
        <div className="modules-filter">
          <span className="modules-filter__icon"><IconSearch size={16} /></span>
          <input
            type="text"
            className="modules-filter__input"
            placeholder="Filtrer les modules..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filter && (
            <button
              className="modules-filter__clear"
              onClick={() => setFilter('')}
              aria-label="Effacer"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grille des modules */}
      {filteredModules.length > 0 ? (
        <div className="modules-grid">
          {filteredModules.map((mod, idx) => (
            <ModuleCard key={mod.id} module={mod} delay={idx * 80} />
          ))}
        </div>
      ) : (
        <div className="modules-empty">
          <span className="modules-empty__icon"><IconInbox size={48} /></span>
          <h3>Aucun module trouvé</h3>
          <p>Essayez avec un autre terme de recherche.</p>
        </div>
      )}
    </div>
  );
}

export default Modules;
