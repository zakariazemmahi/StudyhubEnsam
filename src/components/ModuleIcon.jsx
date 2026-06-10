/**
 * ModuleIcon.jsx — Renders the correct SVG icon for a module or rubrique icon key
 *
 * Maps string keys (from modules.js data) to the corresponding SVG icon component.
 * Accepts all standard props (size, className, style, etc.).
 *
 * Usage:
 *   <ModuleIcon name="brain" size={24} />
 *   <ModuleIcon name={module.icon} size={32} />
 */

import {
  IconMonitor,
  IconBrain,
  IconFactory,
  IconTrendingUp,
  IconWrench,
  IconLanguages,
  IconLightbulb,
  IconBookOpen,
  IconClipboardList,
  IconFlask,
  IconFileCheck,
  IconBarChart,
  IconBook,
  IconFile,
  IconGraduationCap,
} from './Icons';

const ICON_MAP = {
  // Module icons
  'monitor': IconMonitor,
  'brain': IconBrain,
  'factory': IconFactory,
  'trending-up': IconTrendingUp,
  'wrench': IconWrench,
  'languages': IconLanguages,
  'lightbulb': IconLightbulb,

  // Rubrique icons
  'book-open': IconBookOpen,
  'clipboard-list': IconClipboardList,
  'flask': IconFlask,
  'file-check': IconFileCheck,
  'bar-chart': IconBarChart,

  // Fallbacks
  'book': IconBook,
  'file': IconFile,
  'graduation-cap': IconGraduationCap,
};

export default function ModuleIcon({ name, size = 20, className = '', style = {}, ...props }) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    // Fallback: render the string as-is (for backwards compat with any remaining emoji)
    return <span className={className} style={{ fontSize: size, lineHeight: 1, ...style }} {...props}>{name}</span>;
  }

  return <IconComponent size={size} className={className} style={style} {...props} />;
}
