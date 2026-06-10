/**
 * Footer.jsx — Pied de page moderne de StudyHub ENSAM
 *
 * Structure en 3 colonnes (responsive → empilé sur mobile) :
 *   1. Logo StudyHub ENSAM + description courte
 *   2. Liens rapides (Accueil, Modules, À propos)
 *   3. Contact / infos ENSAM Meknès
 *
 * Barre inférieure : copyright + mention Lean Six Sigma
 *
 * Light mode : fond bleu primaire, texte blanc
 * Dark mode  : fond surface, texte var(--text)
 */

import { Link } from 'react-router-dom';
import { IconGraduationCap, IconMapPin, IconMail, IconGlobe } from './Icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">

        {/* --- Colonne 1 : Logo + Description --- */}
        <div className="footer__column">
          <div className="footer__logo">
            <span className="footer__logo-icon" aria-label="StudyHub"><IconGraduationCap size={22} /></span>
            <span>StudyHub ENSAM</span>
          </div>
          <p className="footer__description">
            Plateforme collaborative dédiée aux étudiants de l'ENSAM Meknès.
            Accédez à tous vos cours, TD, TP et examens en un seul endroit.
          </p>
        </div>

        {/* --- Colonne 2 : Liens rapides --- */}
        <div className="footer__column">
          <h4 className="footer__heading">Liens rapides</h4>
          <ul className="footer__links">
            <li>
              <Link to="/" className="footer__link">Accueil</Link>
            </li>
            <li>
              <Link to="/modules" className="footer__link">Modules</Link>
            </li>
            <li>
              <Link to="/about" className="footer__link">À propos</Link>
            </li>
          </ul>
        </div>

        {/* --- Colonne 3 : Contact / ENSAM Meknès --- */}
        <div className="footer__column">
          <h4 className="footer__heading">Contact</h4>
          <div className="footer__contact-item">
            <span className="footer__contact-icon" aria-hidden="true"><IconMapPin size={16} /></span>
            <span>ENSAM Meknès, Marjane II, BP 15290, Meknès</span>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-icon" aria-hidden="true"><IconMail size={16} /></span>
            <span>contact@ensam-meknes.ac.ma</span>
          </div>
          <div className="footer__contact-item">
            <span className="footer__contact-icon" aria-hidden="true"><IconGlobe size={16} /></span>
            <a
              href="https://ensam-meknes.ac.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              ensam-meknes.ac.ma
            </a>
          </div>
        </div>
      </div>

      {/* --- Barre inférieure : copyright --- */}
      <div className="footer__bottom">
        © 2026 StudyHub ENSAM — Projet Lean Six Sigma | ENSAM Meknès
      </div>
    </footer>
  );
}
