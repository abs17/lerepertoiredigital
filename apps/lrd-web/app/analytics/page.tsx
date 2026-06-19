'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TrendingUp, Download, Menu } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const FUNNEL = [
  { label: 'Visiteurs', value: 5000, color: '#3B82F6' },
  { label: 'Ont parcouru les experts', value: 2000, color: '#A16207' },
  { label: 'Ont contacté un expert', value: 500, color: '#10B981' },
  { label: 'Convertis en client', value: 60, color: '#8B5CF6' },
]

const DOMAIN_DATA = [
  { domain: 'SEO', count: 450, pct: 90 },
  { domain: 'Dev Web', count: 380, pct: 76 },
  { domain: 'UX/UI', count: 320, pct: 64 },
  { domain: 'IA', count: 290, pct: 58 },
  { domain: 'Levée de fonds', count: 210, pct: 42 },
  { domain: 'Automatisation', count: 180, pct: 36 },
]

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="hidden md:flex flex-shrink-0"><Sidebar /></div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10"><Sidebar onClose={() => setSidebarOpen(false)} /></div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <h1 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
              <Download size={13} /> Exporter CSV
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md" style={{ color: 'var(--color-secondary)' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>Vue d'ensemble</h2>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>Performance de la plateforme — Juin 2025</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Taux de conversion', value: '1.2%', sub: '+0.3% ce mois', color: '#10B981' },
              { label: 'Score qualité leads', value: '8.2/10', sub: '+0.4 ce mois', color: '#3B82F6' },
              { label: 'Engagement experts', value: '87%', sub: '+5% ce mois', color: '#A16207' },
              { label: 'ROI événements', value: '4.2x', sub: '+0.8x ce mois', color: '#8B5CF6' },
            ].map(k => (
              <div key={k.label} className="p-5 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>{k.label}</p>
                <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>{k.value}</p>
                <p className="text-xs flex items-center gap-1" style={{ color: k.color }}><TrendingUp size={11} />{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
              <h3 className="font-semibold text-sm mb-5" style={{ color: 'var(--color-foreground)' }}>Funnel de conversion</h3>
              <div className="space-y-4">
                {FUNNEL.map((step, i) => {
                  const pct = Math.round((step.value / FUNNEL[0].value) * 100)
                  return (
                    <div key={step.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: 'var(--color-secondary)' }}>{step.label}</span>
                        <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                          {step.value.toLocaleString('fr-FR')} <span style={{ color: 'var(--color-secondary)', fontWeight: 400 }}>({pct}%)</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                        <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: step.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Domain popularity */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
              <h3 className="font-semibold text-sm mb-5" style={{ color: 'var(--color-foreground)' }}>Popularité par domaine</h3>
              <div className="space-y-3">
                {DOMAIN_DATA.map(d => (
                  <div key={d.domain}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--color-secondary)' }}>{d.domain}</span>
                      <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{d.count} contacts</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: 'var(--color-accent)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
