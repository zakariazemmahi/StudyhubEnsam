/**
 * ModuleDetail — Page détaillée d'un module
 * 
 * Affiche les éléments en accordéon avec les rubriques de chaque élément.
 * Intègre le mode admin pour l'ajout de documents.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { RUBRIQUE_TYPES } from '../data/modules';
import { IconSearch, IconPackage, IconCalendar, IconTimer, IconScale, IconStarFilled, IconStar, IconChevronDown, IconPlus } from '../components/Icons';
import ModuleIcon from '../components/ModuleIcon';
import RubriqueCard from '../components/RubriqueCard';
import AdminModal from '../components/AdminModal';
import './ModuleDetail.css';

function ModuleDetail() {
  const { id } = useParams();
  const { modules, isAdmin, addDocument, removeDocument, addRecent, isFavorite, toggleFavorite } = useData();

  // Trouver le module
  const module = modules.find(m => m.id === parseInt(id));

  // Éléments expandés (Set d'IDs)
  const [expandedElements, setExpandedElements] = useState(new Set());

  // Admin modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedRubrique, setSelectedRubrique] = useState(null);

  // Ouvrir le premier élément par défaut
  useEffect(() => {
    if (module && module.elements.length > 0) {
      setExpandedElements(new Set([module.elements[0].id]));
    }
  }, [module]);

  // Ajouter aux récents
  useEffect(() => {
    if (module) {
      addRecent({
        type: 'module',
        id: module.id,
        title: module.title,
        moduleId: module.id,
      });
    }
  }, [module, addRecent]);

  // Toggle un élément
  const toggleElement = (elementId) => {
    setExpandedElements(prev => {
      const next = new Set(prev);
      if (next.has(elementId)) {
        next.delete(elementId);
      } else {
        next.add(elementId);
      }
      return next;
    });
  };

  // Ouvrir le modal admin
  const handleAddDocument = (elementId, rubriqueKey) => {
    setSelectedElement(elementId);
    setSelectedRubrique(rubriqueKey);
    setShowModal(true);
  };

  // Soumettre un document via le modal
  const handleSubmitDocument = ({ moduleId, elementId, rubriqueKey, document }) => {
    addDocument(moduleId, elementId, rubriqueKey, document);
    setShowModal(false);
  };

  // 404
  if (!module) {
    return (
      <div className="module-detail">
        <div className="module-not-found">
          <span className="module-not-found__icon"><IconSearch size={48} /></span>
          <h2>Module non trouvé</h2>
          <p>Le module demandé n'existe pas.</p>
          <Link to="/modules" className="btn btn-primary">
            Retour aux modules
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="module-detail">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb__link">Accueil</Link>
        <span className="breadcrumb__sep">›</span>
        <Link to="/modules" className="breadcrumb__link">Modules</Link>
        <span className="breadcrumb__sep">›</span>
        <span className="breadcrumb__current">{module.title}</span>
      </nav>

      {/* Module Header */}
      <div className="module-header">
        <div className="module-header__icon" style={{ '--module-color': module.color }}>
          <span><ModuleIcon name={module.icon} size={36} /></span>
        </div>
        <div className="module-header__info">
          {module.code && (
            <span className="module-header__code">{module.code}</span>
          )}
          <h1 className="module-header__title">{module.title}</h1>
          <p className="module-header__desc">{module.description}</p>
          <div className="module-header__accent" style={{ background: module.color }} />
          <div className="module-header__meta">
            <span className="module-header__badge">
              <IconPackage size={14} /> {module.elements.length} élément{module.elements.length > 1 ? 's' : ''}
            </span>
            <span className="module-header__badge">
              <IconCalendar size={14} /> Semestre {module.semester}
            </span>
            {module.vhMod && (
              <span className="module-header__badge">
                <IconTimer size={14} /> {module.vhMod}h
              </span>
            )}
            {module.coefMod && (
              <span className="module-header__badge">
                <IconScale size={14} /> Coef {module.coefMod}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Elements Accordion */}
      <div className="elements-list">
        <h2 className="elements-title">Éléments du module</h2>
        
        {module.elements.map((element, idx) => {
          const isExpanded = expandedElements.has(element.id);
          const fav = isFavorite(element.id);

          return (
            <div
              className={`element-accordion ${isExpanded ? 'element-accordion--open' : ''}`}
              key={element.id}
              style={{ '--delay': `${idx * 60}ms` }}
            >
              {/* Header de l'élément — div cliquable (évite button dans button) */}
              <div
                className="element-accordion__header"
                role="button"
                tabIndex={0}
                onClick={() => toggleElement(element.id)}
                onKeyDown={(e) => e.key === 'Enter' && toggleElement(element.id)}
                aria-expanded={isExpanded}
              >
                <div className="element-accordion__left">
                  <span className="element-accordion__icon"><ModuleIcon name={module.icon} size={22} /></span>
                  <div>
                    {element.code && (
                      <span className="element-accordion__code">{element.code}</span>
                    )}
                    <h3 className="element-accordion__title">{element.title}</h3>
                    <p className="element-accordion__desc">{element.description}</p>
                  </div>
                </div>
                <div className="element-accordion__right">
                  {/* Bouton favori — vrai button indépendant */}
                  <button
                    className={`element-fav-btn ${fav ? 'element-fav-btn--active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(element.id); }}
                    title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    {fav ? <IconStarFilled size={18} /> : <IconStar size={18} />}
                  </button>
                  <span className={`element-accordion__chevron ${isExpanded ? 'element-accordion__chevron--open' : ''}`}>
                    <IconChevronDown size={18} />
                  </span>
                </div>
              </div>

              {/* Contenu de l'élément (rubriques) */}
              {isExpanded && (
                <div className="element-accordion__content">
                  <div className="rubriques-grid">
                    {RUBRIQUE_TYPES.map(rubrique => (
                      <RubriqueCard
                        key={rubrique.key}
                        rubrique={rubrique}
                        documents={element.rubriques[rubrique.key] || []}
                        isAdmin={isAdmin}
                        onAddDocument={() => handleAddDocument(element.id, rubrique.key)}
                        onRemoveDocument={(docId) => removeDocument(module.id, element.id, rubrique.key, docId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FAB Admin */}
      {isAdmin && (
        <button
          className="admin-fab"
          onClick={() => {
            setSelectedElement(module.elements[0]?.id || null);
            setSelectedRubrique(null);
            setShowModal(true);
          }}
          title="Ajouter un document"
        >
          <IconPlus size={24} />
        </button>
      )}

      {/* Admin Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitDocument}
        modules={modules}
        selectedModuleId={module.id}
        selectedElementId={selectedElement}
        selectedRubrique={selectedRubrique}
      />
    </div>
  );
}

export default ModuleDetail;
