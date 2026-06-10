/**
 * AdminModal.jsx — Modal d'ajout de document (admin uniquement)
 *
 * Affiche un formulaire dans un modal pour ajouter un nouveau document :
 *   - Sélection du module, élément, rubrique
 *   - Saisie du titre, URL, type de fichier
 *   - Validation complète de tous les champs
 *   - Animation d'entrée (scale + opacity)
 *
 * Props :
 *   @param {boolean}  isOpen             — contrôle l'affichage du modal
 *   @param {Function} onClose            — callback pour fermer le modal
 *   @param {Function} onSubmit           — callback avec les données du document
 *   @param {Array}    modules            — liste complète des modules
 *   @param {number}   selectedModuleId   — pré-sélection du module (optionnel)
 *   @param {number}   selectedElementId  — pré-sélection de l'élément (optionnel)
 *   @param {string}   selectedRubrique   — pré-sélection de la rubrique (optionnel)
 */

import { useState, useEffect, useCallback } from 'react';
import { RUBRIQUE_TYPES } from '../data/modules.js';
import { IconX, IconPaperclip } from './Icons';
import './AdminModal.css';

/**
 * Génère un identifiant unique simple pour les documents
 * @returns {string} ID au format "doc-{timestamp}-{random}"
 */
function generateId() {
  return `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Retourne la date du jour au format ISO (YYYY-MM-DD)
 */
function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

// Types de fichiers disponibles dans le sélecteur
const FILE_TYPES = [
  { value: 'pdf', label: 'PDF' },
  { value: 'pptx', label: 'PowerPoint (PPTX)' },
  { value: 'docx', label: 'Word (DOCX)' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'link', label: 'Lien externe' },
];

// Rubrique label mapping for select options (without emojis)
const RUBRIQUE_LABELS = {
  'book-open': 'Cours',
  'clipboard-list': 'TD',
  'flask': 'TP',
  'file-check': 'Examens',
  'bar-chart': 'Notes',
};

export default function AdminModal({
  isOpen,
  onClose,
  onSubmit,
  modules = [],
  selectedModuleId = '',
  selectedElementId = '',
  selectedRubrique = '',
}) {
  // --- State du formulaire ---
  const [moduleId, setModuleId] = useState('');
  const [elementId, setElementId] = useState('');
  const [rubriqueKey, setRubriqueKey] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [fileType, setFileType] = useState('pdf');

  // --- State des erreurs de validation ---
  const [errors, setErrors] = useState({});

  // --- Pré-remplissage des sélecteurs à l'ouverture ---
  useEffect(() => {
    if (isOpen) {
      setModuleId(selectedModuleId ? String(selectedModuleId) : '');
      setElementId(selectedElementId ? String(selectedElementId) : '');
      setRubriqueKey(selectedRubrique || '');
      setTitle('');
      setUrl('');
      setFileType('pdf');
      setErrors({});
    }
  }, [isOpen, selectedModuleId, selectedElementId, selectedRubrique]);

  // --- Module sélectionné (pour filtrer les éléments) ---
  const selectedModule = modules.find((m) => String(m.id) === moduleId);
  const availableElements = selectedModule?.elements || [];

  // --- Réinitialiser l'élément si le module change ---
  useEffect(() => {
    // Si l'élément sélectionné n'appartient pas au module choisi, le réinitialiser
    const elementExists = availableElements.some((el) => String(el.id) === elementId);
    if (!elementExists && elementId) {
      setElementId('');
    }
  }, [moduleId, availableElements, elementId]);

  // --- Fermer avec Escape ---
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // --- Validation d'URL ---
  function isValidUrl(string) {
    try {
      const urlObj = new URL(string);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // --- Validation du formulaire ---
  function validate() {
    const newErrors = {};

    if (!moduleId) newErrors.moduleId = 'Veuillez sélectionner un module';
    if (!elementId) newErrors.elementId = 'Veuillez sélectionner un élément';
    if (!rubriqueKey) newErrors.rubriqueKey = 'Veuillez sélectionner une rubrique';
    if (!title.trim()) newErrors.title = 'Le titre est requis';
    if (!url.trim()) {
      newErrors.url = 'L\'URL est requise';
    } else if (!isValidUrl(url.trim())) {
      newErrors.url = 'L\'URL doit commencer par http:// ou https:// — Exemple : https://drive.google.com/...';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // --- Soumission du formulaire ---
  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    // Construire l'objet document
    const document = {
      id: generateId(),
      title: title.trim(),
      type: fileType,
      url: url.trim(),
      date: getTodayISO(),
    };

    // Appeler le callback parent
    onSubmit({
      moduleId: Number(moduleId),
      elementId: Number(elementId),
      rubriqueKey,
      document,
    });

    // Fermer le modal
    onClose();
  }

  // --- Ne rien rendre si le modal est fermé ---
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay semi-transparent */}
      <div
        className="admin-modal__overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal principal */}
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        {/* Bouton de fermeture */}
        <button
          className="admin-modal__close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <IconX size={18} />
        </button>

        {/* Titre */}
        <div className="admin-modal__header">
          <h2 id="admin-modal-title" className="admin-modal__title">
            <IconPaperclip size={20} /> Ajouter un Document
          </h2>
        </div>

        {/* Formulaire */}
        <form className="admin-modal__form" onSubmit={handleSubmit} noValidate>

          {/* --- Champ : Module --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-module">
              Module <span className="admin-modal__required">*</span>
            </label>
            <select
              id="modal-module"
              className="admin-modal__select"
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
            >
              <option value="">-- Sélectionner un module --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.title}
                </option>
              ))}
            </select>
            {errors.moduleId && (
              <p className="admin-modal__error">{errors.moduleId}</p>
            )}
          </div>

          {/* --- Champ : Élément --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-element">
              Élément <span className="admin-modal__required">*</span>
            </label>
            <select
              id="modal-element"
              className="admin-modal__select"
              value={elementId}
              onChange={(e) => setElementId(e.target.value)}
              disabled={!moduleId}
            >
              <option value="">-- Sélectionner un élément --</option>
              {availableElements.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.title}
                </option>
              ))}
            </select>
            {errors.elementId && (
              <p className="admin-modal__error">{errors.elementId}</p>
            )}
          </div>

          {/* --- Champ : Rubrique --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-rubrique">
              Rubrique <span className="admin-modal__required">*</span>
            </label>
            <select
              id="modal-rubrique"
              className="admin-modal__select"
              value={rubriqueKey}
              onChange={(e) => setRubriqueKey(e.target.value)}
            >
              <option value="">-- Sélectionner une rubrique --</option>
              {RUBRIQUE_TYPES.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
            {errors.rubriqueKey && (
              <p className="admin-modal__error">{errors.rubriqueKey}</p>
            )}
          </div>

          {/* --- Champ : Titre du document --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-title">
              Titre du document <span className="admin-modal__required">*</span>
            </label>
            <input
              id="modal-title"
              type="text"
              className="admin-modal__input"
              placeholder="Ex: Cours Introduction Deep Learning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="admin-modal__error">{errors.title}</p>
            )}
          </div>

          {/* --- Champ : URL / Lien --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-url">
              URL / Lien du document <span className="admin-modal__required">*</span>
            </label>
            <input
              id="modal-url"
              type="url"
              className="admin-modal__input"
              placeholder="https://drive.google.com/file/d/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className="admin-modal__hint">
              Google Drive, OneDrive, Dropbox ou tout lien direct vers le fichier.
            </p>
            {errors.url && (
              <p className="admin-modal__error">{errors.url}</p>
            )}
          </div>

          {/* --- Champ : Type de fichier --- */}
          <div className="admin-modal__field">
            <label className="admin-modal__label" htmlFor="modal-filetype">
              Type de fichier
            </label>
            <select
              id="modal-filetype"
              className="admin-modal__select"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              {FILE_TYPES.map((ft) => (
                <option key={ft.value} value={ft.value}>
                  {ft.label}
                </option>
              ))}
            </select>
          </div>

          {/* --- Boutons d'action --- */}
          <div className="admin-modal__actions">
            <button
              type="button"
              className="admin-modal__btn admin-modal__btn--secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="admin-modal__btn admin-modal__btn--primary"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
