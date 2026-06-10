/**
 * CourseCreationModal.jsx — Modal de création d'un nouveau cours (admin uniquement)
 *
 * Permet aux administrateurs de créer un nouveau module/cours avec titre, description, icône,
 * et d'ajouter des éléments (cours, TD, TP, etc.)
 */

import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { IconX, IconPlus, IconTrash } from './Icons';
import ModuleIcon from './ModuleIcon';
import './AdminModal.css';

// Icônes disponibles et valides
const AVAILABLE_ICONS = [
  'monitor', 'brain', 'factory', 'trending-up', 'wrench',
  'languages', 'lightbulb', 'book-open'
];

const COLORS = [
  '#4361ee', '#f72585', '#3a86ff', '#06ffa5', '#ffbe0b',
  '#ff006e', '#8338ec', '#fb5607', '#ff006e', '#ff006e'
];

export default function CourseCreationModal({ isOpen, onClose }) {
  const { createModule, addElementToModule, modules } = useData();

  const [step, setStep] = useState(1); // Step 1: Course info, Step 2: Add elements
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('monitor');
  const [selectedColor, setSelectedColor] = useState('#4361ee');
  const [elements, setElements] = useState([]);
  const [elementTitle, setElementTitle] = useState('');
  const [elementDesc, setElementDesc] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [createdModuleId, setCreatedModuleId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTitle('');
      setDescription('');
      setSelectedIcon('monitor');
      setSelectedColor('#4361ee');
      setElements([]);
      setElementTitle('');
      setElementDesc('');
      setErrors({});
      setSuccessMessage('');
      setCreatedModuleId(null);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Validation Step 1
  function validateStep1() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Le titre du cours est requis';
    if (!description.trim()) newErrors.description = 'La description est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Ajouter un élément à la liste
  function handleAddElement() {
    if (!elementTitle.trim()) {
      setErrors(prev => ({ ...prev, elementTitle: 'Le titre de l\'élément est requis' }));
      return;
    }
    if (!elementDesc.trim()) {
      setErrors(prev => ({ ...prev, elementDesc: 'La description de l\'élément est requise' }));
      return;
    }

    setElements(prev => [...prev, {
      id: Date.now(),
      title: elementTitle.trim(),
      description: elementDesc.trim()
    }]);
    setElementTitle('');
    setElementDesc('');
    setErrors(prev => {
      const copy = { ...prev };
      delete copy.elementTitle;
      delete copy.elementDesc;
      return copy;
    });
  }

  // Supprimer un élément
  function handleRemoveElement(id) {
    setElements(prev => prev.filter(el => el.id !== id));
  }

  // Continuer vers step 2
  function handleContinue() {
    if (!validateStep1()) return;
    setStep(2);
  }

  // Créer le cours et les éléments
  function handleSubmit(e) {
    e.preventDefault();

    try {
      const newModule = createModule(title, description, selectedIcon, selectedColor);
      setCreatedModuleId(newModule.id);

      // Ajouter les éléments
      elements.forEach(el => {
        addElementToModule(newModule.id, el.title, el.description);
      });

      setSuccessMessage(`Cours "${newModule.title}" créé avec ${elements.length} élément(s)!`);
      
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setSelectedIcon('monitor');
        setSelectedColor('#4361ee');
        setElements([]);
        setElementTitle('');
        setElementDesc('');
        setSuccessMessage('');
        setCreatedModuleId(null);
        setStep(1);
        onClose();
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Erreur lors de la création du cours' });
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="admin-modal__overlay" onClick={onClose} aria-hidden="true" />

      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        <button
          className="admin-modal__close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <IconX size={20} />
        </button>

        <div className="admin-modal__content">
          {successMessage ? (
            <>
              <h2 id="course-modal-title" className="admin-modal__title">✅ Succès!</h2>
              <div className="admin-modal__success">
                <p>{successMessage}</p>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h2 id="course-modal-title" className="admin-modal__title">
                ➕ Créer un nouveau cours - Étape 1/2
              </h2>
              <p className="admin-modal__subtitle">Informations générales du cours</p>

              <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="admin-modal__form">
                {/* Titre */}
                <div className="admin-modal__field">
                  <label className="admin-modal__label">
                    Titre du cours <span className="admin-modal__required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`admin-modal__input ${errors.title ? 'admin-modal__input--error' : ''}`}
                    placeholder="Ex: Prototypage Digital, Machine Learning..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <span className="admin-modal__error">{errors.title}</span>}
                </div>

                {/* Description */}
                <div className="admin-modal__field">
                  <label className="admin-modal__label">
                    Description <span className="admin-modal__required">*</span>
                  </label>
                  <textarea
                    className={`admin-modal__textarea ${errors.description ? 'admin-modal__input--error' : ''}`}
                    placeholder="Décrivez le contenu du cours..."
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <span className="admin-modal__error">{errors.description}</span>}
                </div>

                {/* Icône */}
                <div className="admin-modal__field">
                  <label className="admin-modal__label">Icône du cours</label>
                  <div className="admin-modal__icon-grid">
                    {AVAILABLE_ICONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        className={`admin-modal__icon-btn ${selectedIcon === icon ? 'admin-modal__icon-btn--selected' : ''}`}
                        onClick={() => setSelectedIcon(icon)}
                        title={icon}
                      >
                        <ModuleIcon name={icon} size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Couleur */}
                <div className="admin-modal__field">
                  <label className="admin-modal__label">Couleur du cours</label>
                  <div className="admin-modal__color-grid">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`admin-modal__color-btn ${selectedColor === color ? 'admin-modal__color-btn--selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="admin-modal__actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Suivant (Ajouter des éléments)
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 id="course-modal-title" className="admin-modal__title">
                ➕ Créer un nouveau cours - Étape 2/2
              </h2>
              <p className="admin-modal__subtitle">Ajouter des éléments (optionnel)</p>

              <form onSubmit={handleSubmit} className="admin-modal__form">
                {/* Ajouter élément */}
                <div className="admin-modal__field">
                  <label className="admin-modal__label">Titre de l'élément</label>
                  <input
                    type="text"
                    className={`admin-modal__input ${errors.elementTitle ? 'admin-modal__input--error' : ''}`}
                    placeholder="Ex: Desktop Prototyping, Web Development..."
                    value={elementTitle}
                    onChange={(e) => setElementTitle(e.target.value)}
                  />
                  {errors.elementTitle && <span className="admin-modal__error">{errors.elementTitle}</span>}
                </div>

                <div className="admin-modal__field">
                  <label className="admin-modal__label">Description de l'élément</label>
                  <textarea
                    className={`admin-modal__textarea ${errors.elementDesc ? 'admin-modal__input--error' : ''}`}
                    placeholder="Décrivez cet élément du cours..."
                    rows="2"
                    value={elementDesc}
                    onChange={(e) => setElementDesc(e.target.value)}
                  />
                  {errors.elementDesc && <span className="admin-modal__error">{errors.elementDesc}</span>}
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleAddElement}
                  style={{ marginBottom: '16px' }}
                >
                  <IconPlus size={16} /> Ajouter cet élément
                </button>

                {/* Liste des éléments */}
                {elements.length > 0 && (
                  <div className="admin-modal__elements-list">
                    <h4 style={{ marginTop: 0 }}>Éléments ajoutés ({elements.length})</h4>
                    {elements.map((el) => (
                      <div key={el.id} className="admin-modal__element-item">
                        <div>
                          <strong>{el.title}</strong>
                          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.7 }}>{el.description}</p>
                        </div>
                        <button
                          type="button"
                          className="admin-modal__element-delete"
                          onClick={() => handleRemoveElement(el.id)}
                          title="Supprimer"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="admin-modal__actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    ← Précédent
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Créer le cours
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
