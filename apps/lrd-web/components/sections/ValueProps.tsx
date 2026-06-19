import { Code2, Search, Palette, Bot, Globe, TrendingUp, Briefcase } from 'lucide-react'

const services = [
  { icon: Code2, label: 'IT & Freelance', desc: 'Experts IT, dev web, accompagnement freelance', color: '#3B82F6' },
  { icon: Search, label: 'SEO', desc: 'Référencement naturel, visibilité, lead generation', color: '#10B981' },
  { icon: Palette, label: 'UX/UI Design', desc: 'Expérience utilisateur, design premium', color: '#8B5CF6' },
  { icon: Bot, label: 'IA & Automatisation', desc: 'Agents IA, chatbots, formations pratiques', color: '#F59E0B' },
  { icon: Globe, label: 'Digital Nomade', desc: 'Travailler partout, formations en ligne', color: '#EF4444' },
  { icon: TrendingUp, label: 'Levée de fonds', desc: 'Coaching pitch, stratégie de croissance', color: '#06B6D4' },
  { icon: Briefcase, label: 'Dev Commercial', desc: 'Développement business, prospection', color: '#84CC16' },
]

export function ValueProps() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-fluid">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Un collectif d'experts du numérique
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-secondary)' }}>
            Chaque demande traitée comme une expérience unique, avec un expert dédié qui accompagne votre projet pas à pas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.label}
                className="p-5 rounded-xl card-hover cursor-pointer"
                style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${service.color}18` }}>
                  <Icon size={20} style={{ color: service.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>{service.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{service.desc}</p>
              </div>
            )
          })}
          {/* Empty slot filler for 4-col grid alignment */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
