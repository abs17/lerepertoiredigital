'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { TrendingUp, TrendingDown, Users, Target, Calendar, Plug, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const INTEGRATIONS = [
  { id: 'hubspot', name: 'HubSpot', status: 'disconnected', color: '#FF7A59' },
  { id: 'linkedin', name: 'LinkedIn', status: 'connected', color: '#0A66C2' },
  { id: 'calendly', name: 'Calendly', status: 'disconnected', color: '#006BFF' },
  { id: 'stripe', name: 'Stripe', status: 'disconnected', color: '#635BFF' },
  { id: 'brevo', name: 'Brevo', status: 'disconnected', color: '#0B996E' },
]

const RECENT_LEADS = [
  { id: 1, name: 'Sophie Martin', company: 'TechCorp', domain: 'SEO', status: 'new', date: "Aujourd'hui" },
  { id: 2, name: 'Jean Dupont', company: 'Startup XY', domain: 'IA', status: 'contacted', date: 'Hier' },
  { id: 3, name: 'Marie Leroy', company: 'PME Digital', domain: 'Dev Web', status: 'qualified', date: '20 Jun' },
  { id: 4, name: 'Karim Benali', company: 'Scale Agency', domain: 'UX/UI', status: 'converted', date: '18 Jun' },
  { id: 5, name: 'Laura Chen', company: 'FinTech FR', domain: 'Levée fonds', status: 'new', date: '17 Jun' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6', label: 'Nouveau' },
  contacted: { bg: 'rgba(161,98,7,0.1)', color: '#A16207', label: 'Contacté' },
  qualified: { bg: 'rgba(16,185,129,0.1)', color: '#10B981', label: 'Qualifié' },
  converted: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6', label: 'Converti' },
  rejected: { bg: 'rgba(220,38,38,0.1)', color: '#DC2626', label: 'Rejeté' },
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('John')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('lrd_user') || '{}')
      if (u.name) setUserName(u.name.split(' ')[0])
    } catch {}
  }, [])

  const kpis = [
    { label: 'Contacts', value: '245', trend: '+12%', up: true, icon: Users, color: '#3B82F6' },
    { label: 'Leads actifs', value: '48', trend: '+8%', up: true, icon: Target, color: '#A16207' },
    { label: 'Événements', value: '12', trend: '+25%', up: true, icon: Calendar, color: '#10B981' },
    { label: 'Revenus', value: '15.4k€', trend: '+18%', up: true, icon: TrendingUp, color: '#8B5CF6' },
  ]

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Sidebar desktop */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <h1 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Dashboard</h1>
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md" style={{ color: 'var(--color-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>Bonjour, {userName} 👋</h2>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>Voici un aperçu de votre activité</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map(kpi => {
              const Icon = kpi.icon
              return (
                <div key={kpi.label} className="p-5 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>{kpi.label}</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                      <Icon size={16} style={{ color: kpi.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>{kpi.value}</p>
                  <span className="flex items-center gap-1 text-xs font-medium" style={{ color: kpi.up ? '#10B981' : '#EF4444' }}>
                    {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {kpi.trend} ce mois
                  </span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent leads */}
            <div className="lg:col-span-2 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Leads récents</h3>
                <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>Voir tous</span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {RECENT_LEADS.map(lead => (
                  <div key={lead.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>{lead.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{lead.company} · {lead.domain}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: STATUS_COLORS[lead.status].bg, color: STATUS_COLORS[lead.status].color }}>
                        {STATUS_COLORS[lead.status].label}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>{lead.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div className="rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <Plug size={15} />
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>Intégrations</h3>
              </div>
              <div className="p-4 space-y-3">
                {INTEGRATIONS.map(integ => (
                  <div key={integ.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: integ.color }}>
                        {integ.name[0]}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>{integ.name}</span>
                    </div>
                    {integ.status === 'connected' ? (
                      <span className="flex items-center gap-1 text-xs" style={{ color: '#10B981' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Actif
                      </span>
                    ) : (
                      <button className="text-xs font-medium px-2.5 py-1 rounded-md transition-opacity hover:opacity-80" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>
                        Connecter
                      </button>
                    )}
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
