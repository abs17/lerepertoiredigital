import { Shield, Award, Clock, HeartHandshake } from 'lucide-react'

const testimonials = [
  { quote: "Le Répertoire Digital m'a permis de trouver un expert SEO en 48h. Résultats visibles dès le premier mois.", author: "Sarah M.", role: "CEO, Startup FinTech", rating: 5 },
  { quote: "J'ai trouvé mon co-fondateur technique via la plateforme. Aujourd'hui on a levé 2M€.", author: "Karim B.", role: "Founder, ScaleUp", rating: 5 },
  { quote: "Interface claire, experts vérifiés, suivi de projet intégré. Une plateforme sérieuse.", author: "Lucie D.", role: "CMO, PME", rating: 5 },
]

const trustBadges = [
  { icon: Shield, label: 'Experts vérifiés', desc: 'Chaque profil validé par notre équipe' },
  { icon: Award, label: 'Qualité garantie', desc: 'Évaluations et avis authentiques' },
  { icon: Clock, label: 'Réponse rapide', desc: 'Contact sous 24h en moyenne' },
  { icon: HeartHandshake, label: 'Accompagnement', desc: 'Support dédié tout au long du projet' },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-fluid">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.label} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(161,98,7,0.1)' }}>
                  <Icon size={22} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>{badge.label}</h4>
                <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{badge.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Ce qu'ils en disent</h2>
          <p style={{ color: 'var(--color-secondary)' }}>Témoignages de nos utilisateurs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#F59E0B' }}>★</span>
                ))}
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-foreground)' }}>"{t.quote}"</p>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>{t.author}</p>
                <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
