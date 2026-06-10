/**
 * RubriqueCard.jsx — Carte de rubrique (Cours, TD, TP, etc.)
 *
 * Affiche une rubrique avec ses documents dans le détail d'un module :
 *   - En-tête : icône SVG + label + badge nombre de docs
 *   - Description de la rubrique
 *   - Liste de documents avec icône type, titre, date, boutons
 *   - Message si aucun document
 *   - Bouton "+" pour ajouter un document (admin uniquement)
 *
 * Props :
 *   @param {Object}   rubrique      — { key, label, icon, description }
 *   @param {Array}    documents     — liste des documents de cette rubrique
 *   @param {Function} onAddDocument — callback pour ajouter un document
 *   @param {boolean}  isAdmin       — affiche le bouton d'ajout si true
 *   @param {number}   index         — index pour l'animation staggered
 */

import { IconFile, IconFileText, IconPresentation, IconExternalLink, IconTrash, IconPlus } from './Icons';
import ModuleIcon from './ModuleIcon';
import './RubriqueCard.css';

/**
 * Retourne le composant icône SVG correspondant au type de fichier
 * @param {string} type — pdf, pptx, docx, xlsx, link
 */
function FileIcon({ type }) {
  switch (type) {
    case 'pdf':
      return <IconFileText size={16} />;
    case 'pptx':
      return <IconPresentation size={16} />;
    case 'docx':
      return <IconFileText size={16} />;
    case 'xlsx':
      return <IconPresentation size={16} />;
    case 'link':
      return <IconExternalLink size={16} />;
    default:
      return <IconFile size={16} />;
  }
}

/**
 * Formate une date ISO en format lisible (ex: "15 jan. 2026")
 * @param {string} dateStr — date au format ISO (YYYY-MM-DD)
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function RubriqueCard({ rubrique, documents = [], onAddDocument, onRemoveDocument, isAdmin = false, index = 0 }) {
  // Nombre de documents dans cette rubrique
  const docCount = documents.length;

  // Délai d'animation staggered
  const animationDelay = `${index * 0.1}s`;

  return (
    <div
      className="rubrique-card"
      style={{ '--delay': animationDelay }}
    >
      {/* --- En-tête : icône + titre + badge --- */}
      <div className="rubrique-card__header">
        <span className="rubrique-card__icon" aria-hidden="true">
          <ModuleIcon name={rubrique.icon} size={22} />
        </span>
        <h4 className="rubrique-card__title">{rubrique.label}</h4>
        <span className="rubrique-card__count">
          {docCount} doc{docCount > 1 ? 's' : ''}
        </span>
      </div>

      {/* --- Description de la rubrique --- */}
      <p className="rubrique-card__description">{rubrique.description}</p>

      {/* --- Liste des documents --- */}
      {docCount > 0 ? (
        <div className="rubrique-card__documents">
          {documents.map((doc) => (
            <div key={doc.id} className="rubrique-card__doc-item">
              {/* Icône du type de fichier */}
              <span className="rubrique-card__doc-icon" aria-hidden="true">
                <FileIcon type={doc.type} />
              </span>

              {/* Infos du document */}
              <div className="rubrique-card__doc-info">
                <p className="rubrique-card__doc-title">{doc.title}</p>
                <p className="rubrique-card__doc-date">{formatDate(doc.date)}</p>
              </div>

              {/* Boutons d'action */}
              <div className="rubrique-card__doc-actions">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rubrique-card__btn rubrique-card__btn--outline"
                >
                  Consulter
                </a>
                <a
                  href={doc.url}
                  download
                  className="rubrique-card__btn rubrique-card__btn--filled"
                >
                  Télécharger
                </a>
                {isAdmin && (
                  <button
                    className="rubrique-card__btn rubrique-card__btn--delete"
                    onClick={() => onRemoveDocument && onRemoveDocument(doc.id)}
                    aria-label={`Supprimer ${doc.title}`}
                    title="Supprimer ce document"
                  >
                    <IconTrash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Message quand aucun document n'est disponible */
        <p className="rubrique-card__empty">Ce contenu n'a pas encore été publié.</p>
      )}

      {/* --- Bouton d'ajout (admin seulement) --- */}
      {isAdmin && (
        <button
          className="rubrique-card__add-btn"
          onClick={() => onAddDocument && onAddDocument(rubrique.key)}
          aria-label={`Ajouter un document à ${rubrique.label}`}
        >
          <IconPlus size={18} />
        </button>
      )}
    </div>
  );
}
