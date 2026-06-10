/**
 * StatCard.jsx — Carte de statistiques avec compteur animé
 *
 * Affiche une statistique animée sur la page d'accueil :
 *   - Icône dans un cercle coloré (fond à 15% opacity)
 *   - Compteur qui monte de 0 à `value` (~2 secondes, easeOutExpo)
 *   - Signe "+" affiché si value > 10
 *   - Label descriptif
 *
 * L'animation se déclenche uniquement quand la carte devient
 * visible dans le viewport (Intersection Observer).
 *
 * Props :
 *   @param {string|ReactElement} icon — icône SVG ou texte
 *   @param {number} value — valeur cible du compteur
 *   @param {string} label — texte descriptif sous le nombre
 *   @param {string} color — couleur d'accent (cercle d'icône)
 *   @param {number} delay — délai d'animation en secondes (ex: 0.2)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import './StatCard.css';

export default function StatCard({ icon, value, label, color = '#e94560', delay = 0 }) {
  // Valeur affichée du compteur (démarre à 0)
  const [displayValue, setDisplayValue] = useState(0);

  // Indique si la carte est visible dans le viewport
  const [isVisible, setIsVisible] = useState(false);

  // Référence DOM pour l'Intersection Observer
  const cardRef = useRef(null);

  // Flag pour éviter de relancer l'animation
  const hasAnimated = useRef(false);

  // --- Intersection Observer : détecte la visibilité ---
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Déclenche uniquement à la première apparition
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 } // 30% visible pour déclencher
    );

    observer.observe(element);

    // Nettoyage à la destruction du composant
    return () => observer.disconnect();
  }, []);

  // --- Animation du compteur avec requestAnimationFrame ---
  const animateCounter = useCallback(() => {
    const duration = 2000; // 2 secondes
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Courbe easeOutExpo pour un ralentissement naturel
      const easeOut = 1 - Math.pow(2, -10 * progress);
      const current = Math.round(easeOut * value);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  // Démarre l'animation quand la carte devient visible
  useEffect(() => {
    if (isVisible) {
      animateCounter();
    }
  }, [isVisible, animateCounter]);

  // --- Couleur de fond du cercle d'icône (15% opacity) ---
  const iconCircleStyle = {
    backgroundColor: `${color}26`, // 26 en hex = ~15% opacity
  };

  return (
    <div
      ref={cardRef}
      className="stat-card"
      style={{ '--delay': `${delay}s` }}
    >
      {/* Cercle d'icône coloré */}
      <div className="stat-card__icon-circle" style={iconCircleStyle}>
        <span role="img" aria-hidden="true">{icon}</span>
      </div>

      {/* Valeur animée + signe "+" si > 10 */}
      <div className="stat-card__value">
        {displayValue}
        {value > 10 && <span className="stat-card__plus">+</span>}
      </div>

      {/* Label descriptif */}
      <p className="stat-card__label">{label}</p>
    </div>
  );
}
