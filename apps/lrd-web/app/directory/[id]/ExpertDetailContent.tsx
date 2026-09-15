'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Star, MapPin, ArrowLeft, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Expert } from './experts'

export function ExpertDetailContent({ expert }: { expert: Expert }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <div className="container-fluid py-8">
          <Link href="/directory" className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70" style={{ color: 'var(--color-secondary)' }}>
            <ArrowLeft size={16} /> Retour au répertoire
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Expert info */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl mb-6" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img src={expert.avatar} alt={expert.name} className="w-24 h-24 rounded-2xl" style={{ border: '3px solid var(--color-border)' }} />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>{expert.name}</h1>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-secondary)' }}>{expert.title}</p>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--color-secondary)' }}>
                      <span className="flex items-center gap-1"><Star size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />{expert.rating} ({expert.reviewCount} avis)</span>
                      <span className="flex items-center gap-1"><MapPin size={14} />{expert.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} />Répond en {expert.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: expert.availability === 'available' ? '#10B981' : '#F59E0B' }} />
                      <span className="text-sm" style={{ color: expert.availability === 'available' ? '#10B981' : '#F59E0B' }}>
                        {expert.availability === 'available' ? 'Disponible pour nouveaux projets' : 'Actuellement occupé'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-foreground)' }}>À propos</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>{expert.bio}</p>
              </div>

              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-foreground)' }}>Domaine d&apos;expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {[expert.domain, 'Consulting', 'Formation', 'Stratégie'].map(d => (
                    <span key={d} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact + Rate */}
            <div className="space-y-5">
              <div className="p-6 rounded-2xl sticky top-24" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div className="text-center mb-5">
                  <p className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>{expert.hourlyRate}€</p>
                  <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>par heure</p>
                </div>

                <div className="space-y-3">
                  <Link href="/login"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                  >
                    <Mail size={16} /> Contacter cet expert
                  </Link>
                  <Link href="/dashboard"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm"
                    style={{ backgroundColor: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
                  >
                    Ajouter aux leads
                  </Link>
                </div>

                <div className="mt-5 pt-5 space-y-2 text-xs" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}>
                  <div className="flex justify-between">
                    <span>Réponse moyenne</span>
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>{expert.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Note</span>
                    <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>{expert.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disponibilité</span>
                    <span className="font-medium" style={{ color: expert.availability === 'available' ? '#10B981' : '#F59E0B' }}>
                      {expert.availability === 'available' ? 'Disponible' : 'Occupé'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
