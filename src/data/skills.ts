export type SkillGroup = {
  title: string
  accent: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    accent: '#4D8DFF',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React.js',
      'Responsive Design',
      'UI/UX Enhancement',
      'Frontend Development',
      'Mobile-First Design',
    ],
  },
  {
    title: 'Backend',
    accent: '#7CFFB2',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'MongoDB',
      'MVC Architecture',
      'API Integration',
      'Backend Development',
    ],
  },
  {
    title: 'Engineering',
    accent: '#D6B981',
    skills: [
      'Git',
      'GitHub',
      'Debugging',
      'Clean Code',
      'Performance Optimization',
      'Problem Solving',
      'Software Engineering',
      'Full Stack Web Development',
    ],
  },
]
