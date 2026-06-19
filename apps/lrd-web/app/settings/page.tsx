'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Save, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const INTEGRATIONS = [
  { id: 'hubspot', name: 'HubSpot', desc: 'CRM & Marketing', color: '#FF7A59' },
  { id: 'linkedin', name: 'LinkedIn', desc: 'Réseau professionnel', color: '#0A66C2' },
  { id: 'calendly', name: 'Calendly', desc: 'Prise de rendez-vous', color: '#006BFF' },
  { id: 'stripe', name: 'Stripe', desc: 'Paiements en ligne', color: '#635BFF' },
  { id: 'brevo', name: 'Brevo', desc: 'Email marketing', color: '#0B996E' },
  { id: 'mailchimp', name: 'Mailchimp', desc: 'Newsletters', color: '#FFE01B' },
]

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState<'profile' | 'integrations' | 'preferences'>('profile')
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@exemple.com' })
  const [saved, setSaved] = useState(false)
  const [connected, setConnected] = useState<string[]>(['linkedin'])

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('lrd_user') || '{}')
      if (u.name) setProfile({ name: u.name, email: u.email || 'john@exemple.com' })
    } catch {}
  }, [])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleIntegration(id: string) {
    setConnected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const inputStyle = { backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }

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
            <h1 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Paramètres</h1>
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md" style={{ color: 'var(--color-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="p-6 max-w-2xl">
          {/* Tabs */}
          <div className="flex gap-1 mb-8 p-1 rounded-lg w-fit" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
            {([['profile', 'Profil'], ['integrations', 'Intégrations'], ['preferences', 'Préférences']] as const).map(([t, l]) => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all"
                style={{ backgroundColor: tab === t ? 'var(--color-accent)' : 'transparent', color: tab === t ? 'white' : 'var(--color-secondary)' }}
              >{l}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5">
              {[{ label: 'Nom complet', key: 'name', type: 'text' }, { label: 'Email', key: 'email', type: 'email' }].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>{f.label}</label>
                  <input type={f.type} value={(profile as any)[f.key]}
                    onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>
              ))}
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
                <Save size={15} /> {saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
              </button>
            </form>
          )}

          {tab === 'integrations' && (
            <div className="space-y-3">
              {INTEGRATIONS.map(integ => (
                <div key={integ.id} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: integ.color }}>
                      {integ.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>{integ.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{integ.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleIntegration(integ.id)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: connected.includes(integ.id) ? 'rgba(16,185,129,0.1)' : 'rgba(161,98,7,0.1)',
                      color: connected.includes(integ.id) ? '#10B981' : 'var(--color-accent)'
                    }}
                  >
                    {connected.includes(integ.id) ? '✓ Connecté' : 'Connecter'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'preferences' && (
            <div className="space-y-4">
              {[
                { label: 'Notifications email', desc: 'Recevoir les alertes par email' },
                { label: 'Résumé hebdomadaire', desc: 'Rapport d\'activité chaque lundi' },
                { label: 'Alertes leads', desc: 'Notifier lors d\'un nouveau lead' },
              ].map(pref => (
                <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-foreground)' }}>{pref.label}</p>
                    <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{pref.desc}</p>
                  </div>
                  <div className="relative w-10 h-6 rounded-full cursor-pointer" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--color-foreground)' }}>Mode sombre</p>
                  <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>Activer le thème sombre</p>
                </div>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-10 h-6 rounded-full cursor-pointer transition-all"
                  style={{ backgroundColor: theme === 'dark' ? 'var(--color-accent)' : 'var(--color-border)' }}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
