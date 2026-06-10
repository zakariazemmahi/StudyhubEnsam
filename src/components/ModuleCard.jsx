/**
 * ModuleCard.jsx — Carte de module pour la grille d'accueil
 *
 * Affiche les informations principales d'un module :
 *   - Bande colorée (module.color)
 *   - Icône SVG (via ModuleIcon)
 *   - Titre (h3) + description (tronquée 2 lignes)
 *   - Badge avec le nombre d'éléments
 *
 * Enveloppé dans un <Link> vers /module/{module.id}
 *
 * Props :
 *   @param {Object} module — objet module (id, title, description, icon, color, elements[])
 *   @param {number} index  — index dans la grille (pour le délai d'animation staggered)
 */

import { Link } from 'react-router-dom';
import { IconPackage } from './Icons';
import ModuleIcon from './ModuleIcon';
import './ModuleCard.css';

export default function ModuleCard({ module, index = 0 }) {
  // Nombre total d'éléments du module
  const elementCount = module.elements?.length || 0;

  // Délai d'animation staggered : chaque carte apparaît 80ms après la précédente
  const animationDelay = `${index * 0.08}s`;

  return (
    <Link
      to={`/module/${module.id}`}
      className="module-card"
      style={{
        '--module-color': module.color,
        '--delay': animationDelay,
      }}
      aria-label={`Accéder au module ${module.title}`}
    >
      {/* Icône SVG du module */}
      <span className="module-card__icon" aria-hidden="true">
        <ModuleIcon name={module.icon} size={36} />
      </span>

      {/* Titre du module */}
      <h3 className="module-card__title">{module.title}</h3>

      {/* Description tronquée à 2 lignes */}
      <p className="module-card__description">{module.description}</p>

      {/* Badge indiquant le nombre d'éléments */}
      <span className="module-card__badge">
        <IconPackage size={14} /> {elementCount} élément{elementCount > 1 ? 's' : ''}
      </span>
    </Link>
  );
}
