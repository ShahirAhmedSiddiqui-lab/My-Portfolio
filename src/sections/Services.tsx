import { services } from '../data/services'
import { SectionTitle } from '../components/SectionTitle'
import { ServiceCard } from '../components/ServiceCard'

export function Services() {
  return (
    <section className="section-shell" id="services">
      <div className="container-shell space-y-10">
        <SectionTitle
          eyebrow="14 / Services"
          title="Services built around modern digital execution."
          description="Clear, practical offerings shaped for businesses, premium landing pages, and product-minded web work."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-stagger>
          {services.map((service) => (
            <ServiceCard
              bestFor={service.bestFor}
              description={service.description}
              key={service.title}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
