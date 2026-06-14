import aureonEstateImage from '../assets/projects/aureon-estate.jpg'
import axiomStudiosImage from '../assets/projects/axiom-studios.jpg'
import elanRestaurantImage from '../assets/projects/elan-restaurant.jpg'
import noirBeansImage from '../assets/projects/noir-beans.jpg'
import stratosAutosImage from '../assets/projects/stratos-autos.jpg'
import valenzaFashionImage from '../assets/projects/valenza-fashion.jpg'

export type Project = {
  id: string
  title: string
  category: string
  shortDescription: string
  description: string
  features: string[]
  visualMood: string[]
  techStack: string[]
  accentColor: string
  liveUrl: string
  githubUrl: string
  image: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    id: 'aureon-estate',
    title: 'Aureon Estate',
    category: 'Luxury Real Estate Website',
    shortDescription: 'Premium property storytelling for high-end estate branding and cinematic showcases.',
    description:
      'Aureon Estate presents luxury property experiences through editorial structure, rich visual hierarchy, and reusable property showcase patterns.',
    features: [
      'Cinematic property hero',
      'Interactive property cards',
      'Lifestyle-focused gallery',
      'Brand and inquiry section',
      'Fast-loading landing page structure',
    ],
    visualMood: ['Dark luxury', 'Champagne accents', 'Architectural calm'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#D6B981',
    liveUrl: 'https://aureon-estates.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Aureon-Estates',
    image: aureonEstateImage,
    imageAlt: 'Aureon Estate homepage preview',
  },
  {
    id: 'elan-restaurant',
    title: 'Elan Restaurant',
    category: 'High-End Restaurant Website',
    shortDescription: 'Fine dining storytelling focused on atmosphere, menu presentation, and reservation intent.',
    description:
      'Elan Restaurant is built around warm hospitality visuals, chef-driven storytelling, and an elegant menu preview structure.',
    features: [
      'Full-screen dining hero',
      'Signature dishes showcase',
      'Interactive menu preview',
      'Reservation call-to-action',
      'Mobile-first hospitality layout',
    ],
    visualMood: ['Warm cinematic lighting', 'Soft transitions', 'Premium hospitality'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#E7A84B',
    liveUrl: 'https://elan-restaurant26.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Elan-Restaurant',
    image: elanRestaurantImage,
    imageAlt: 'Elan Restaurant homepage preview',
  },
  {
    id: 'valenza-fashion',
    title: 'Valenza Fashion',
    category: 'Fashion Brand Website',
    shortDescription: 'Editorial elegance for a modern fashion identity, collection showcase, and lookbook flow.',
    description:
      'Valenza Fashion explores how a premium brand can balance product presentation, identity, and campaign storytelling in a clean landing page.',
    features: [
      'Editorial hero section',
      'Featured collection showcase',
      'Lookbook moments',
      'Seasonal campaign area',
      'Newsletter and shopping CTA',
    ],
    visualMood: ['Editorial', 'Elegant', 'Fashion-forward minimalism'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#F2A7C6',
    liveUrl: 'https://valenza-fashion.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Valenza-Fashion',
    image: valenzaFashionImage,
    imageAlt: 'Valenza Fashion homepage preview',
  },
  {
    id: 'axiom-studios',
    title: 'Axiom Studios',
    category: 'Architecture Studio Website',
    shortDescription: 'Minimal structure and spatial storytelling for a modern architecture practice.',
    description:
      'Axiom Studios is designed around grid discipline, project storytelling, and professional inquiry pathways for architecture clients.',
    features: [
      'Minimal studio hero',
      'Structured project previews',
      'Process section',
      'Typography-led visual hierarchy',
      'Professional contact flow',
    ],
    visualMood: ['Grayscale', 'Structured', 'Spatial calm'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#C9D2DC',
    liveUrl: 'https://axiom-studios.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Axiom-Studios',
    image: axiomStudiosImage,
    imageAlt: 'Axiom Studios homepage preview',
  },
  {
    id: 'noir-beans',
    title: 'Noir Beans',
    category: 'Premium Coffee Shop Website',
    shortDescription: 'Warm, playful, human-centered brand experience with soft visuals and menu storytelling.',
    description:
      'Noir Beans translates a coffee brand into a friendly and polished digital experience with character-driven moments and clear calls to action.',
    features: [
      'Warm coffee hero',
      'Featured drinks section',
      'Interactive mini-game concept',
      'Mood and review content',
      'Light-themed responsive UI',
    ],
    visualMood: ['Warm', 'Friendly', 'Soft and inviting'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#9A6B45',
    liveUrl: 'https://noir-beans.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Noir-Beans',
    image: noirBeansImage,
    imageAlt: 'Noir Beans homepage preview',
  },
  {
    id: 'stratos-automobile',
    title: 'Stratos Automobile',
    category: 'Automotive Brand Website',
    shortDescription: 'Cinematic automotive presentation built around speed, motion, and premium control.',
    description:
      'Stratos Automobile showcases high-energy brand storytelling with a layout that can later support velocity-driven motion and car detail panels.',
    features: [
      'Cinematic car hero',
      'Vehicle showcase modules',
      'Performance highlights',
      'Gallery transition system',
      'Motion-ready layout structure',
    ],
    visualMood: ['Fast', 'Confident', 'Premium automotive'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#4D8DFF',
    liveUrl: 'https://stratos-autos.vercel.app/',
    githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab/Stratos-Autos',
    image: stratosAutosImage,
    imageAlt: 'Stratos Autos homepage preview',
  },
]
