export type SceneSection =
  | 'hero'
  | 'about'
  | 'education'
  | 'skills'
  | 'projects'
  | 'process'
  | 'hashlink'
  | 'services'
  | 'contact'

export type SceneState = {
  accent: string
  secondaryAccent: string
  cameraFov: number
  cameraPosition: [number, number, number]
  coreScale: number
  corePosition: [number, number]
  glowOpacity: number
  overlay: string
  particleSpeed: number
  particleCount: number
  rotationBoost: number
  skillOrbit: number
  projectPanels: number
  roadmap: number
  terminal: number
}

export const sceneStates: Record<SceneSection, SceneState> = {
  hero: {
    accent: '#D6B981',
    secondaryAccent: '#4D8DFF',
    cameraFov: 34,
    cameraPosition: [0, 0, 8],
    coreScale: 1,
    corePosition: [2.4, 0.15],
    glowOpacity: 0.9,
    overlay:
      'radial-gradient(circle at 70% 24%,rgba(214,185,129,0.14),transparent_16%),radial-gradient(circle at 78% 34%,rgba(77,141,255,0.14),transparent_22%)',
    particleSpeed: 0.18,
    particleCount: 32,
    rotationBoost: 1,
    skillOrbit: 0,
    projectPanels: 0,
    roadmap: 0,
    terminal: 0,
  },
  about: {
    accent: '#D6B981',
    secondaryAccent: '#7CFFB2',
    cameraFov: 35,
    cameraPosition: [0, 0.15, 8.2],
    coreScale: 0.94,
    corePosition: [2.1, -0.1],
    glowOpacity: 0.68,
    overlay:
      'radial-gradient(circle at 68% 30%,rgba(214,185,129,0.1),transparent_18%),radial-gradient(circle at 80% 36%,rgba(124,255,178,0.09),transparent_20%)',
    particleSpeed: 0.13,
    particleCount: 26,
    rotationBoost: 0.9,
    skillOrbit: 0,
    projectPanels: 0,
    roadmap: 0,
    terminal: 0,
  },
  education: {
    accent: '#C9D2DC',
    secondaryAccent: '#4D8DFF',
    cameraFov: 35,
    cameraPosition: [0, 0.25, 8.1],
    coreScale: 0.92,
    corePosition: [2.2, 0.2],
    glowOpacity: 0.56,
    overlay:
      'radial-gradient(circle at 72% 28%,rgba(201,210,220,0.1),transparent_18%),radial-gradient(circle at 80% 38%,rgba(77,141,255,0.08),transparent_20%)',
    particleSpeed: 0.11,
    particleCount: 24,
    rotationBoost: 0.85,
    skillOrbit: 0,
    projectPanels: 0,
    roadmap: 0,
    terminal: 0,
  },
  skills: {
    accent: '#7CFFB2',
    secondaryAccent: '#4D8DFF',
    cameraFov: 33,
    cameraPosition: [0, 0.1, 7.8],
    coreScale: 1.08,
    corePosition: [1.65, -0.05],
    glowOpacity: 0.84,
    overlay:
      'radial-gradient(circle at 66% 24%,rgba(124,255,178,0.14),transparent_18%),radial-gradient(circle at 78% 34%,rgba(77,141,255,0.12),transparent_20%)',
    particleSpeed: 0.19,
    particleCount: 34,
    rotationBoost: 1.14,
    skillOrbit: 1,
    projectPanels: 0,
    roadmap: 0,
    terminal: 0,
  },
  projects: {
    accent: '#F2A7C6',
    secondaryAccent: '#D6B981',
    cameraFov: 32,
    cameraPosition: [0, -0.05, 7.6],
    coreScale: 1.02,
    corePosition: [1.35, 0.08],
    glowOpacity: 0.78,
    overlay:
      'radial-gradient(circle at 64% 26%,rgba(242,167,198,0.16),transparent_16%),radial-gradient(circle at 76% 36%,rgba(214,185,129,0.12),transparent_18%)',
    particleSpeed: 0.16,
    particleCount: 30,
    rotationBoost: 1.08,
    skillOrbit: 0.35,
    projectPanels: 1,
    roadmap: 0,
    terminal: 0,
  },
  process: {
    accent: '#D6B981',
    secondaryAccent: '#7CFFB2',
    cameraFov: 33,
    cameraPosition: [0, 0.05, 7.95],
    coreScale: 0.96,
    corePosition: [1.82, 0.06],
    glowOpacity: 0.74,
    overlay:
      'radial-gradient(circle at 67% 27%,rgba(214,185,129,0.13),transparent_18%),radial-gradient(circle at 78% 38%,rgba(124,255,178,0.1),transparent_22%)',
    particleSpeed: 0.13,
    particleCount: 28,
    rotationBoost: 0.98,
    skillOrbit: 0.2,
    projectPanels: 0.2,
    roadmap: 1,
    terminal: 0,
  },
  hashlink: {
    accent: '#4D8DFF',
    secondaryAccent: '#7CFFB2',
    cameraFov: 34,
    cameraPosition: [0, 0.1, 8.05],
    coreScale: 0.92,
    corePosition: [2.05, 0.18],
    glowOpacity: 0.7,
    overlay:
      'radial-gradient(circle at 69% 26%,rgba(77,141,255,0.14),transparent_18%),radial-gradient(circle at 78% 36%,rgba(124,255,178,0.12),transparent_20%)',
    particleSpeed: 0.15,
    particleCount: 26,
    rotationBoost: 0.94,
    skillOrbit: 0.15,
    projectPanels: 0,
    roadmap: 0.35,
    terminal: 0,
  },
  services: {
    accent: '#E7A84B',
    secondaryAccent: '#D6B981',
    cameraFov: 34,
    cameraPosition: [0, 0.08, 8.1],
    coreScale: 0.95,
    corePosition: [1.95, 0.08],
    glowOpacity: 0.7,
    overlay:
      'radial-gradient(circle at 69% 28%,rgba(231,168,75,0.16),transparent_18%),radial-gradient(circle at 78% 36%,rgba(214,185,129,0.1),transparent_20%)',
    particleSpeed: 0.14,
    particleCount: 24,
    rotationBoost: 0.96,
    skillOrbit: 0.1,
    projectPanels: 0.18,
    roadmap: 0.2,
    terminal: 0,
  },
  contact: {
    accent: '#4D8DFF',
    secondaryAccent: '#F5F0E8',
    cameraFov: 31,
    cameraPosition: [0, 0, 7.45],
    coreScale: 0.88,
    corePosition: [1.15, -0.06],
    glowOpacity: 0.88,
    overlay:
      'radial-gradient(circle at 63% 28%,rgba(77,141,255,0.18),transparent_16%),radial-gradient(circle at 76% 36%,rgba(245,240,232,0.12),transparent_18%)',
    particleSpeed: 0.12,
    particleCount: 20,
    rotationBoost: 0.88,
    skillOrbit: 0,
    projectPanels: 0,
    roadmap: 0.15,
    terminal: 1,
  },
}

export function normalizeSceneSection(sectionId: string | null | undefined): SceneSection {
  switch (sectionId) {
    case 'about':
      return 'about'
    case 'education':
      return 'education'
    case 'skills':
      return 'skills'
    case 'projects':
    case 'aureon-estate':
    case 'elan-restaurant':
    case 'valenza-fashion':
    case 'axiom-studios':
    case 'noir-beans':
    case 'stratos-automobile':
      return 'projects'
    case 'process':
      return 'process'
    case 'hashlink':
      return 'hashlink'
    case 'services':
    case 'why-work-with-me':
      return 'services'
    case 'contact':
      return 'contact'
    default:
      return 'hero'
  }
}
