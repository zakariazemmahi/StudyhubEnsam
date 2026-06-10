/**
 * Home — Page d'accueil de StudyHub ENSAM
 *
 * Sections : Hero, Statistiques, Modules populaires
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getStats } from '../data/modules';
import { IconGraduationCap, IconTrendingUp, IconZap, IconArrowRight, IconLibrary, IconLayers, IconFiles, IconClipboardCheck } from '../components/Icons';
import StatCard from '../components/StatCard';
import ModuleCard from '../components/ModuleCard';
import './Home.css';

function Home() {
  const { modules } = useData();
  const stats = getStats(modules);
  const sectionsRef = useRef([]);

  // Animation au scroll (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
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

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        {/* Formes décoratives flottantes */}
        <div className="hero-shapes">
          <div className="hero-shape hero-shape--1" />
          <div className="hero-shape hero-shape--2" />
          <div className="hero-shape hero-shape--3" />
          <div className="hero-shape hero-shape--4" />
        </div>

        <div className="hero-content">
          <span className="hero-badge"><IconGraduationCap size={16} /> ENSAM Meknès • IATD-SI</span>
          <h1 className="hero-title">
            Study<span className="hero-title--accent">Hub</span> ENSAM
          </h1>
          <p className="hero-subtitle">
            Plateforme collaborative des ressources pédagogiques
          </p>
          <p className="hero-desc">
            Filière IATD-SI • Semestre
          </p>
          <Link to="/modules" className="hero-cta">
            Explorer les modules
            <span className="hero-cta__arrow"><IconArrowRight size={16} /></span>
          </Link>
        </div>
      </section>


      {/* ===== Statistiques Section ===== */}
      <section className="stats-section section-animate" ref={addSectionRef}>
        <div className="container">
          <span className="section-badge"><IconTrendingUp size={14} /> En chiffres</span>
          <h2 className="section-title">StudyHub en chiffres</h2>
          <p className="section-subtitle">
            Une plateforme riche en contenu pour accompagner votre parcours.
          </p>

          <div className="stats-grid">
            <StatCard icon={<IconLibrary size={28} />} value={stats.modules} label="Modules" color="#4361ee" delay={0} />
            <StatCard icon={<IconLayers size={28} />} value={stats.elements} label="Éléments" color="#7209b7" delay={100} />
            <StatCard icon={<IconFiles size={28} />} value={stats.documents} label="Documents" color="#06d6a0" delay={200} />
            <StatCard icon={<IconClipboardCheck size={28} />} value={stats.examens} label="Examens & Contrôles" color="#e94560" delay={300} />
          </div>
        </div>
      </section>

      {/* ===== Accès rapide Section ===== */}
      <section className="quick-section section-animate" ref={addSectionRef}>
        <div className="container">
          <span className="section-badge"><IconZap size={14} /> Accès rapide</span>
          <h2 className="section-title">Modules populaires</h2>
          <p className="section-subtitle">
            Accédez rapidement aux modules les plus consultés.
          </p>

          <div className="quick-grid">
            {modules.slice(0, 4).map((mod, idx) => (
              <ModuleCard key={mod.id} module={mod} delay={idx * 80} />
            ))}
          </div>

          <div className="quick-cta">
            <Link to="/modules" className="btn btn-secondary btn-lg">
              Voir tous les modules <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
