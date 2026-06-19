import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-fluid">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}>
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(161,98,7,0.3) 0%, transparent 60%)' }} />
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Users size={28} style={{ color: 'var(--color-on-primary)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-on-primary)' }}>
            Prêt à développer votre réseau ?
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Rejoignez 500+ experts et 2000+ entreprises qui font confiance au Répertoire Digital pour leurs projets numériques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/directory" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
              Explorer le répertoire <ArrowRight size={16} />
            </Link>
            <Link href="/signup" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-on-primary)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Créer un compte gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
