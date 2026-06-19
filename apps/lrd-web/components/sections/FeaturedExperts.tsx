import Link from 'next/link'
import { Star, MapPin, ArrowRight } from 'lucide-react'

const experts = [
  { id: 'exp-1', name: 'Nejme Abdelouafi', title: 'Expert développement commercial & levée de fonds', domain: 'Levée de fonds', rating: 4.9, location: 'Paris, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=0' },
  { id: 'exp-2', name: 'Azzedine Nebti', title: 'Entrepreneur/Coach/Formateur', domain: 'Digital nomade', rating: 4.8, location: 'Toulouse, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { id: 'exp-3', name: 'Elodie Allegro', title: 'Développeuse Web', domain: 'Dev Web', rating: 4.9, location: 'Lyon, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
  { id: 'exp-4', name: 'Hamid El Haloui', title: 'Expert SEO WordPress', domain: 'SEO', rating: 4.7, location: 'Marseille, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
  { id: 'exp-5', name: 'Amina Marie', title: 'Experte IA / Automatisation', domain: 'IA', rating: 4.9, location: 'Paris, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  { id: 'exp-6', name: 'Thomas Renard', title: 'UX Designer Senior', domain: 'UX/UI', rating: 4.8, location: 'Bordeaux, France', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' },
]

export function FeaturedExperts() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--color-muted)' }}>
      <div className="container-fluid">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Nos talents du numérique
            </h2>
            <p style={{ color: 'var(--color-secondary)' }}>Experts vérifiés, disponibles pour vos projets</p>
          </div>
          <Link href="/directory" className="hidden md:flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            Voir tous les experts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Link key={expert.id} href={`/directory/${expert.id}`}
              className="p-6 rounded-xl card-hover block"
              style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-12 h-12 rounded-full"
                  style={{ border: '2px solid var(--color-border)' }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5 truncate" style={{ color: 'var(--color-foreground)' }}>{expert.name}</h3>
                  <p className="text-xs truncate" style={{ color: 'var(--color-secondary)' }}>{expert.title}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>
                  {expert.domain}
                </span>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-secondary)' }}>
                  <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  {expert.rating}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-secondary)' }}>
                <MapPin size={12} />
                {expert.location}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/directory" className="btn-outline">
            Voir tous les experts
          </Link>
        </div>
      </div>
    </section>
  )
}
