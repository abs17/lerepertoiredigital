'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Plus, Search, Edit2, Trash2, Menu } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const INIT_EXPERTS = [
  { id: 'exp-1', name: 'Nejme Abdelouafi', title: 'Expert développement commercial', domain: 'Levée de fonds', status: 'active' },
  { id: 'exp-2', name: 'Azzedine Nebti', title: 'Entrepreneur/Coach/Formateur', domain: 'Digital nomade', status: 'active' },
  { id: 'exp-3', name: 'Elodie Allegro', title: 'Développeuse Web', domain: 'Dev Web', status: 'active' },
  { id: 'exp-4', name: 'Hamid El Haloui', title: 'Expert SEO WordPress', domain: 'SEO', status: 'active' },
  { id: 'exp-5', name: 'Amina Marie', title: 'Experte IA / Automatisation', domain: 'IA', status: 'active' },
  { id: 'exp-6', name: 'Thomas Renard', title: 'UX Designer Senior', domain: 'UX/UI', status: 'pending' },
]

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [experts, setExperts] = useState(INIT_EXPERTS)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'experts' | 'events'>('experts')
  const { theme, setTheme } = useTheme()

  const filtered = experts.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.domain.toLowerCase().includes(search.toLowerCase()))

  function deleteExpert(id: string) {
    if (confirm('Supprimer cet expert ?')) setExperts(prev => prev.filter(e => e.id !== id))
  }

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
            <h1 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Administration</h1>
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md" style={{ color: 'var(--color-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
            {(['experts', 'events'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 rounded-md text-sm font-medium capitalize transition-all"
                style={{
                  backgroundColor: tab === t ? 'var(--color-accent)' : 'transparent',
                  color: tab === t ? 'white' : 'var(--color-secondary)'
                }}
              >{t === 'experts' ? 'Experts' : 'Événements'}</button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-secondary)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder={`Rechercher ${tab === 'experts' ? 'un expert' : 'un événement'}...`}
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none w-72"
                style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
              <Plus size={15} /> Ajouter
            </button>
          </div>

          {tab === 'experts' && (
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-muted)' }}>
                    {['Expert', 'Domaine', 'Statut', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-secondary)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                  {filtered.map(expert => (
                    <tr key={expert.id} className="transition-colors hover:bg-[var(--color-muted)]">
                      <td className="px-5 py-4">
                        <p className="font-medium text-sm" style={{ color: 'var(--color-foreground)' }}>{expert.name}</p>
                        <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{expert.title}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>
                          {expert.domain}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: expert.status === 'active' ? '#10B981' : '#F59E0B' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: expert.status === 'active' ? '#10B981' : '#F59E0B' }} />
                          {expert.status === 'active' ? 'Actif' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-md transition-opacity hover:opacity-70" style={{ color: 'var(--color-secondary)' }}><Edit2 size={14} /></button>
                          <button onClick={() => deleteExpert(expert.id)} className="p-1.5 rounded-md transition-opacity hover:opacity-70" style={{ color: 'var(--color-destructive)' }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: 'var(--color-secondary)' }}>Aucun résultat</div>
              )}
            </div>
          )}

          {tab === 'events' && (
            <div className="text-center py-20 text-sm" style={{ color: 'var(--color-secondary)' }}>
              <p className="font-semibold mb-2">Gestion des événements</p>
              <p>Fonctionnalité disponible en Phase 2</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
