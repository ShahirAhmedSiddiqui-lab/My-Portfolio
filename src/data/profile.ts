import profilePhoto from '../../resources/Shaheer.jpeg'
import resumeUrl from '../../resources/Shaheer Ahmed Siddiqui Resume.pdf?url'

export type NavLink = {
  href: string
  label: string
}

export type AboutCard = {
  title: string
  description: string
}

export type EducationItem = {
  title: string
  subtitle: string
  detail: string
  period: string
}

export type WhyPoint = {
  title: string
  description: string
}

export const profile = {
  name: 'Shaheer Ahmed Siddiqui',
  role: 'Full Stack Web Developer',
  founder: 'Founder of HashLink Corporation',
  summary:
    'Software Engineering student building responsive, user-driven websites and web applications with a product mindset and a premium visual standard.',
  brandStatement:
    'I build websites that feel premium, perform smoothly, and communicate value with clarity.',
  email: 'siddiquishahir936@gmail.com',
  emailUrl:
    'https://mail.google.com/mail/?view=cm&fs=1&to=siddiquishahir936@gmail.com',
  githubLabel: 'github.com/ShahirAhmedSiddiqui-lab',
  githubUrl: 'https://github.com/ShahirAhmedSiddiqui-lab',
  linkedinLabel: 'www.linkedin.com/in/shahir-siddiqui',
  linkedinUrl: 'https://www.linkedin.com/in/shahir-siddiqui',
  hashlinkWebsiteUrl: 'https://hash-link-corp-portfolio.vercel.app/',
  hashlinkLinkedinUrl: 'https://www.linkedin.com/in/hashlink-corp/',
  photo: profilePhoto,
  resumeUrl,
}

export const navigationLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export const aboutCards: AboutCard[] = [
  {
    title: 'Frontend Craft',
    description: 'Responsive UI, clean layouts, motion sensitivity, and experience-led implementation.',
  },
  {
    title: 'Backend Logic',
    description: 'Node.js, Express, REST APIs, MongoDB, and practical application structure.',
  },
  {
    title: 'Business Purpose',
    description: 'Websites that support trust, clarity, conversion, and real business goals.',
  },
]

export const educationItems: EducationItem[] = [
  {
    title: 'Karachi University',
    subtitle: "Bachelor's in Software Engineering",
    detail: 'Computer Software Engineering',
    period: '2026 - 2029',
  },
  {
    title: 'Saylani Mass I.T Training',
    subtitle: 'Full Stack Developer Training',
    detail: 'Ongoing practical development track',
    period: 'Current',
  },
  {
    title: 'HashLink Corporation',
    subtitle: 'Founder and Builder',
    detail: 'Modern websites, web applications, and digital experiences for businesses.',
    period: 'Active',
  },
]

export const hashlinkValues = [
  'Creativity',
  'Functionality',
  'Reliability',
  'Performance',
  'Business Purpose',
]

export const whyWorkWithMePoints: WhyPoint[] = [
  {
    title: 'I Think Like a Developer and a User',
    description: 'The website should work technically and still feel natural, smooth, and easy to use.',
  },
  {
    title: 'I Care About Clean Execution',
    description: 'Readable code, clear structure, and a polished user flow matter as much as visuals.',
  },
  {
    title: 'I Build With Business Purpose',
    description: 'A website should support a real goal, not only look impressive in isolation.',
  },
  {
    title: 'I Keep Learning',
    description: 'Ongoing software engineering education and practical training keep the work improving.',
  },
  {
    title: 'I Focus on Detail',
    description: 'Layout rhythm, responsiveness, motion sensitivity, and clarity create a premium result.',
  },
]
