/**
 * About — Page À propos
 * 
 * Présentation du projet Lean Six Sigma, de l'équipe et de l'encadrante.
 */
import { useEffect, useRef } from 'react';
import {
  IconInfo, IconTarget, IconAlertTriangle, IconLightbulb,
  IconPieChart, IconUsers, IconBuilding
} from '../components/Icons';
import './About.css';

function About() {
  const sectionsRef = useRef([]);

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Données de l'équipe
  const team = [
    { name: 'ES-SAAIDI Youssef', initials: 'EY', color: '#4361ee', role: 'Étudiant Ingénieur — IATD-SI' },
    { name: 'ZEMMAHI Zakaraie', initials: 'ZZ', color: '#7209b7', role: 'Étudiant Ingénieur — IATD-SI' },
    { name: 'BOUTRID Mourad', initials: 'BM', color: '#f72585', role: 'Étudiant Ingénieur — IATD-SI' },
  ];

  return (
    <div className="about">
      {/* ===== Hero Section ===== */}
      <section className="about-hero">
        <div className="about-hero__shapes">
          <div className="about-hero__shape about-hero__shape--1" />
          <div className="about-hero__shape about-hero__shape--2" />
        </div>
        <div className="about-hero__content">
          <span className="hero-badge"><IconInfo size={16} /> À propos</span>
          <h1 className="about-hero__title">À propos du projet</h1>
          <p className="about-hero__subtitle">Projet Lean Six Sigma — Gemba</p>
        </div>
      </section>

      {/* ===== Projet Section ===== */}
      <section className="about-project about-animate" ref={addRef}>
        <div className="container">
          <span className="section-badge"><IconTarget size={14} /> Notre Projet</span>
          <h2 className="section-title">Contexte et Objectif</h2>

          <div className="about-project__card">
            <p className="about-project__text">
              Ce projet s'inscrit dans le cadre du module <strong>Lean Six Sigma Intelligent</strong>. 
              En utilisant la méthodologie <strong>Gemba</strong> (observation terrain), nous avons identifié 
              un problème récurrent chez les étudiants de la filière IATD-SI de l'ENSAM Meknès.
            </p>

            <div className="about-project__problem">
              <div className="about-project__problem-icon"><IconAlertTriangle size={24} /></div>
              <div>
                <h4>Problème identifié</h4>
                <p>
                  Les étudiants perdent souvent le lien du Drive de la filière. Les documents sont 
                  dispersés sur plusieurs plateformes et la recherche des cours prend beaucoup de temps, 
                  ce qui impacte la productivité et l'organisation des étudiants.
                </p>
              </div>
            </div>

            <div className="about-project__solution">
              <div className="about-project__solution-icon"><IconLightbulb size={24} /></div>
              <div>
                <h4>Solution proposée</h4>
                <p>
                  Création de <strong>StudyHub ENSAM</strong>, une plateforme web moderne et intuitive 
                  regroupant tous les supports pédagogiques de la filière IATD-SI en un seul endroit.
                </p>
              </div>
            </div>

            <div className="about-project__objective">
              <h4><IconTarget size={18} /> Objectif</h4>
              <p>
                <strong>Centraliser les ressources pédagogiques</strong> afin de réduire le temps de 
                recherche des étudiants et améliorer l'accessibilité aux documents de cours, TD, TP, 
                examens et autres ressources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DMAIC Section ===== */}
      <section className="about-dmaic about-animate" ref={addRef}>
        <div className="container">
          <span className="section-badge"><IconPieChart size={14} /> Méthodologie</span>
          <h2 className="section-title">Approche DMAIC</h2>
          <p className="section-subtitle">Les 5 phases de notre démarche d'amélioration continue.</p>

          <div className="dmaic-timeline">
            {[
              { letter: 'D', title: 'Définir', desc: 'Identification du problème de dispersion des ressources pédagogiques.', color: '#4361ee' },
              { letter: 'M', title: 'Mesurer', desc: 'Quantification du temps perdu par les étudiants pour trouver les documents.', color: '#7209b7' },
              { letter: 'A', title: 'Analyser', desc: 'Enquête Gemba terrain pour identifier les causes racines du problème.', color: '#f72585' },
              { letter: 'I', title: 'Innover', desc: 'Conception et développement de la plateforme StudyHub ENSAM.', color: '#06d6a0' },
              { letter: 'C', title: 'Contrôler', desc: 'Validation de la solution et mesure de la satisfaction des étudiants.', color: '#ff6b35' },
            ].map((step, idx) => (
              <div className="dmaic-step" key={idx} style={{ '--delay': `${idx * 100}ms` }}>
                <div className="dmaic-step__circle" style={{ background: step.color }}>
                  {step.letter}
                </div>
                <div className="dmaic-step__content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Équipe Section ===== */}
      <section className="about-team about-animate" ref={addRef}>
        <div className="container">
          <span className="section-badge"><IconUsers size={14} /> L'Équipe</span>
          <h2 className="section-title">Réalisé par</h2>
          <p className="section-subtitle">Les étudiants derrière ce projet.</p>

          <div className="team-grid">
            {team.map((member, idx) => (
              <div className="team-card" key={idx} style={{ '--delay': `${idx * 100}ms` }}>
                <div className="team-card__avatar" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Encadrement Section ===== */}
      <section className="about-supervisor about-animate" ref={addRef}>
        <div className="container">
          <span className="section-badge"><IconBuilding size={14} /> Encadrement</span>
          <h2 className="section-title">Encadré par</h2>

          <div className="supervisor-card">
            <div className="supervisor-card__avatar" style={{ background: '#06d6a0' }}>
              EI
            </div>
            <div className="supervisor-card__info">
              <h3>EL HASSANI Ibtissam</h3>
              <p>Professeur — ENSAM Meknès</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
