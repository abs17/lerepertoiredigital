'use client'

import Link from 'next/link'
import { Search, ArrowRight, Star, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FadeUp, StaggerGroup, StaggerItem } from '@/components/ui/MotionWrapper'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/directory?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse at 50% -10%, rgba(161,98,7,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(28,25,23,0.06) 0%, transparent 50%)'
      }} />

      <div className="container-fluid">
        <div className="text-center max-w-4xl mx-auto">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 glass" style={{ border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
              <Zap size={14} />
              Plateforme B2B d'experts du numérique
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
              Votre passerelle vers{' '}
              <span style={{ color: 'var(--color-accent)' }}>l'expertise</span>{' '}
              numérique
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
              Découvrez, connectez et collaborez avec les meilleurs experts en IT, SEO, UX/UI, IA, développement commercial et bien plus.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto mb-10">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-secondary)' }} />
                <input
                  type="text"
                  placeholder="SEO, Dev Web, IA, UX/UI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    border: '1.5px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>
              <button type="submit" className="btn-primary flex items-center gap-2 whitespace-nowrap">
                Rechercher <ArrowRight size={16} />
              </button>
            </form>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/directory" className="btn-outline flex items-center gap-2">
                <Users size={16} />
                Explorer le répertoire
              </Link>
              <Link href="/signup" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>
                Rejoindre en tant qu'expert <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Experts vérifiés' },
              { value: '5k+', label: 'Mises en relation' },
              { value: '4.9', label: 'Note moyenne', icon: <Star size={14} style={{ color: 'var(--color-accent)' }} /> },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>
                    {stat.icon}
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-secondary)' }}>{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
