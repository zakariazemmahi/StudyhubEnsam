/**
 * CourseCreationModal.jsx — Modal de création d'un nouveau cours (admin uniquement)
 *
 * Permet aux administrateurs de créer un nouveau module/cours avec titre, description et icône.
 */

import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { IconX } from './Icons';
import ModuleIcon from './ModuleIcon';
import './AdminModal.css';

const AVAILABLE_ICONS = [
  'monitor', 'code', 'database', 'book-open', 'flask',
  'chart-line', 'brain', 'shield', 'network', 'cpu',
  'tool', 'zap', 'layers', 'inbox', 'package'
];

const COLORS = [
  '#4361ee', '#f72585', '#3a86ff', '#06ffa5', '#ffbe0b',
  '#ff006e', '#8338ec', '#fb5607', '#ffbe0b', '#ff006e'
];

export default function CourseCreationModal({ isOpen, onClose }) {
  const { createModule, modules } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('monitor');
  const [selectedColor, setSelectedColor] = useState('#4361ee');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setSelectedIcon('monitor');
      setSelectedColor('#4361ee');
      setErrors({});
      setSuccessMessage('');
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

  function validate() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Le titre du cours est requis';
    }
    if (!description.trim()) {
      newErrors.description = 'La description du cours est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      const newModule = createModule(title, description, selectedIcon, selectedColor);
      setSuccessMessage(`Cours "${newModule.title}" créé avec succès!`);
      
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setSelectedIcon('monitor');
        setSelectedColor('#4361ee');
        setSuccessMessage('');
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
          <h2 id="course-modal-title" className="admin-modal__title">
            ➕ Créer un nouveau cours
          </h2>

          {successMessage ? (
            <div className="admin-modal__success">
              <p>{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="admin-modal__form">
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

              {/* Sélection d'icône */}
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

              {/* Sélection de couleur */}
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

              {/* Erreur de soumission */}
              {errors.submit && <span className="admin-modal__error">{errors.submit}</span>}

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
                  Créer le cours
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
