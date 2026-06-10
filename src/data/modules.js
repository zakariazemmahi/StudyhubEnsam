/**
 * StudyHub ENSAM — Données officielles des modules S8 (IATD-SI)
 *
 * Source : SchoolApp ENSAM — 4ème Année, Filière IATD-SI, 2ème Semestre (S4)
 *
 * Structure hiérarchique :
 *   Module (CodeMod) → Éléments (CodeElem) → Rubriques (vides par défaut, remplies par l'admin)
 */

// Liste des types de rubriques disponibles
// icon est désormais une clé string correspondant aux composants dans Icons.jsx
export const RUBRIQUE_TYPES = [
  { key: 'cours', label: 'Cours', icon: 'book-open', description: 'Supports de cours et présentations' },
  { key: 'td', label: 'TD', icon: 'clipboard-list', description: 'Travaux dirigés et exercices guidés' },
  { key: 'tp', label: 'TP', icon: 'flask', description: 'Travaux pratiques et laboratoires' },
  { key: 'examens', label: 'Examens', icon: 'file-check', description: 'Sujets d\'examens des années précédentes' },
  { key: 'notes', label: 'Notes', icon: 'bar-chart', description: 'Notes et résultats des étudiants' },
];

// ─── Données officielles des modules ────────────────────────────────────────
const modulesData = [
  // IA41 ─────────────────────────────────────────────────────────────────────
  {
    id: 1,
    code: 'IA41',
    title: 'Prototypage Digital',
    description: 'Maîtrise des outils de prototypage numérique : interfaces desktop, web responsives et méthodologies agiles pour la gestion de projets digitaux.',
    icon: 'monitor',
    color: '#4361ee',
    semester: 'S8',
    vhMod: 72,
    coefMod: 5.0,
    elements: [
      {
        id: 101,
        code: 'IA411',
        title: 'Digital Desktop Prototyping',
        description: 'Prototypage d\'applications desktop avec Figma, Adobe XD et outils modernes. (24h CTD)',
        vhCTD: 24, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 102,
        code: 'IA412',
        title: 'Digital Web Prototyping',
        description: 'Conception et prototypage d\'interfaces web responsives modernes. (24h CTD)',
        vhCTD: 24, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 103,
        code: 'IA413',
        title: 'Agile Methodologies',
        description: 'Méthodologies agiles (Scrum, Kanban) pour la gestion de projets digitaux. (16h CTD)',
        vhCTD: 16, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // IA42 ─────────────────────────────────────────────────────────────────────
  {
    id: 2,
    code: 'IA42',
    title: 'Intelligence Artificielle Avancée et Modélisation 3D',
    description: 'Représentation et résolution de problèmes complexes, agents intelligents et modélisation 3D interactive pour jeux et simulations.',
    icon: 'brain',
    color: '#7209b7',
    semester: 'S8',
    vhMod: 72,
    coefMod: 5.0,
    elements: [
      {
        id: 201,
        code: 'IA421',
        title: 'Représentation et Résolution de Problème',
        description: 'Algorithmes de recherche, planification, raisonnement automatique et résolution de problèmes par IA. (34h CTD)',
        vhCTD: 34, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 202,
        code: 'IA422',
        title: 'Framework d\'Agents Intelligents',
        description: 'Conception et implémentation de systèmes multi-agents intelligents avec frameworks modernes. (16h CTD)',
        vhCTD: 16, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 203,
        code: 'IA423',
        title: 'Modélisation 3D Interactive et Jeux Interactifs',
        description: 'Création de modèles 3D interactifs et développement de jeux avec moteurs graphiques modernes. (16h CTD)',
        vhCTD: 16, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // IA43 ─────────────────────────────────────────────────────────────────────
  {
    id: 3,
    code: 'IA43',
    title: 'Industry X.0, IoT, Virtual and Augmented Reality',
    description: 'Technologies de l\'industrie du futur : systèmes IoT connectés, réalité virtuelle et augmentée pour applications industrielles et grand public.',
    icon: 'factory',
    color: '#f72585',
    semester: 'S8',
    vhMod: 56,
    coefMod: 5.0,
    elements: [
      {
        id: 301,
        code: 'IA431',
        title: 'Industrie X.0 et IoT',
        description: 'Internet des objets, capteurs, protocoles de communication et systèmes cyber-physiques. (12h CTD + 18h TP)',
        vhCTD: 12, vhTP: 18, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 302,
        code: 'IA432',
        title: 'Technologies d\'Immersion Virtuelle (VR/AR)',
        description: 'Développement d\'environnements VR et AR immersifs avec Unity, Unreal et dispositifs HMD. (22h CTD)',
        vhCTD: 22, vhTP: 0, coefCC: 2.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // IA44 ─────────────────────────────────────────────────────────────────────
  {
    id: 4,
    code: 'IA44',
    title: 'Lean Six Sigma Intelligent et Conception Collaborative Basée sur les Données',
    description: 'Méthodologie Lean Six Sigma augmentée par l\'IA pour l\'amélioration continue et la conception collaborative data-driven.',
    icon: 'trending-up',
    color: '#06d6a0',
    semester: 'S8',
    vhMod: 48,
    coefMod: 5.0,
    elements: [
      {
        id: 401,
        code: 'IA441',
        title: 'Lean Six Sigma Intelligent et Conception Collaborative',
        description: 'DMAIC augmenté par l\'IA, outils statistiques, conception collaborative et amélioration continue data-driven. (36h CTD + 8h TP)',
        vhCTD: 36, vhTP: 8, coefCC: 4.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // IA45 ─────────────────────────────────────────────────────────────────────
  {
    id: 5,
    code: 'IA45',
    title: 'Qualité Opérationnelle et Maintenance par l\'IA',
    description: 'Démarche qualité industrielle, maîtrise statistique des procédés et maintenance prédictive assistée par l\'intelligence artificielle.',
    icon: 'wrench',
    color: '#ff6b35',
    semester: 'S8',
    vhMod: 72,
    coefMod: 4.0,
    elements: [
      {
        id: 501,
        code: 'IA451',
        title: 'Démarche Qualité',
        description: 'Méthodes de contrôle qualité, normes ISO et outils de gestion de la qualité dans l\'industrie. (24h CTD)',
        vhCTD: 24, vhTP: 0, coefCC: 2.0, coefEX: 0.48,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 502,
        code: 'IA452',
        title: 'Maîtrise Statistique des Procédés (MSP)',
        description: 'Analyse statistique appliquée au contrôle des procédés industriels : cartes de contrôle, capabilité, SPC. (22h CTD)',
        vhCTD: 22, vhTP: 0, coefCC: 2.0, coefEX: 0.48,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 503,
        code: 'IA453',
        title: 'Maintenance par l\'IA',
        description: 'Algorithmes de maintenance prédictive basés sur le machine learning et le traitement de données industrielles. (15h CTD)',
        vhCTD: 15, vhTP: 0, coefCC: 1.0, coefEX: 0.5,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // LE4 ──────────────────────────────────────────────────────────────────────
  {
    id: 6,
    code: 'LE4',
    title: 'Langues Étrangères (Anglais, Français)',
    description: 'Perfectionnement linguistique en anglais et français pour la communication professionnelle et technique en milieu international.',
    icon: 'languages',
    color: '#118ab2',
    semester: 'S8',
    vhMod: 48,
    coefMod: 3.0,
    elements: [
      {
        id: 601,
        code: 'LE41',
        title: 'Langue Anglaise',
        description: 'Anglais technique et professionnel : communication orale, rédaction de rapports, présentations et négociation. (8h CTD + 14h TP)',
        vhCTD: 8, vhTP: 14, coefCC: 0.0, coefEX: 1.0,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 602,
        code: 'LE42',
        title: 'Langue Française',
        description: 'Expression écrite et orale en français : rédaction professionnelle, communication interculturelle et rhétorique. (8h CTD + 14h TP)',
        vhCTD: 8, vhTP: 14, coefCC: 0.0, coefEX: 1.0,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },

  // PS4 ──────────────────────────────────────────────────────────────────────
  {
    id: 7,
    code: 'PS4',
    title: 'Power Skills 4 : Compétences de Vie',
    description: 'Développement des compétences transversales essentielles : projet personnel et professionnel, entrepreneuriat et leadership pour l\'ingénieur du futur.',
    icon: 'lightbulb',
    color: '#ffd166',
    semester: 'S8',
    vhMod: 48,
    coefMod: 3.0,
    elements: [
      {
        id: 701,
        code: 'PS41',
        title: 'Projet Personnel et Professionnel',
        description: 'Construction du projet de carrière, bilan de compétences, CV et préparation à l\'insertion professionnelle. (28h CTD)',
        vhCTD: 28, vhTP: 0, coefCC: 0.3, coefEX: 0.7,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
      {
        id: 702,
        code: 'PS42',
        title: 'Entrepreneuriat',
        description: 'Création d\'entreprise, business model canvas, pitch, financement de startups et écosystème entrepreneurial. (16h CTD)',
        vhCTD: 16, vhTP: 0, coefCC: 0.0, coefEX: 1.0,
        rubriques: { cours: [], td: [], tp: [], examens: [], notes: [] },
      },
    ],
  },
];

export default modulesData;

// ─── Utilitaires statistiques ────────────────────────────────────────────────
export function getStats(modules) {
  let totalElements = 0;
  let totalDocuments = 0;
  let totalExamens = 0;

  modules.forEach(mod => {
    totalElements += mod.elements.length;
    mod.elements.forEach(el => {
      Object.values(el.rubriques).forEach(docs => {
        totalDocuments += docs.length;
      });
      totalExamens += (el.rubriques.examens?.length || 0);
    });
  });

  return {
    modules: modules.length,
    elements: totalElements,
    documents: totalDocuments,
    examens: totalExamens,
  };
}
