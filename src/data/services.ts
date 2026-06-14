export type Service = {
  title: string
  description: string
  bestFor: string
}

export const services: Service[] = [
  {
    title: 'Modern Landing Pages',
    description: 'Premium one-page websites for brands, products, agencies, and businesses.',
    bestFor: 'Launches, premium campaigns, and service-focused storytelling.',
  },
  {
    title: 'Full Stack Web Applications',
    description: 'Frontend and backend web apps using modern JavaScript technologies.',
    bestFor: 'Businesses that need working systems, dashboards, or custom workflows.',
  },
  {
    title: 'Business Websites',
    description: 'Clean, responsive, conversion-focused websites for real companies.',
    bestFor: 'Service brands, local businesses, and portfolio-style web presence.',
  },
  {
    title: 'UI-Focused Frontend Development',
    description: 'Polished layouts, reusable components, responsive structure, and clean execution.',
    bestFor: 'Teams who need stronger visual quality without losing engineering discipline.',
  },
  {
    title: 'API Integration',
    description: 'Connecting frontend interfaces with backend services, databases, and third-party APIs.',
    bestFor: 'Products that need data flow, automation, or external service connectivity.',
  },
  {
    title: 'Website Performance Improvements',
    description: 'Improving responsiveness, asset loading, page speed, and overall user experience.',
    bestFor: 'Existing sites that feel heavy, unclear, or under-optimized.',
  },
]
