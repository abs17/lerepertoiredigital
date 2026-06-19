'use client'

import { Search, Filter, Star, MapPin, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const DOMAINS = ['SEO', 'Dev Web', 'UX/UI', 'IA', 'Automatisation', 'Levée de fonds', 'Dev commercial', 'Digital nomade']

const MOCK_EXPERTS = Array.from({ length: 48 }, (_, i) => ({
  id: `exp-${i + 1}`,
  name: i === 0 ? 'Nejme Abdelouafi' : i === 1 ? 'Azzedine Nebti' : i === 2 ? 'Elodie Allegro' : i === 3 ? 'Hamid El Haloui' : i === 4 ? 'Amina Marie' : `Expert ${i + 1}`,
  title: i === 0 ? 'Expert développement commercial & levée de fonds' : i === 1 ? 'Entrepreneur/Coach/Formateur' : i === 2 ? 'Développeuse Web' : i === 3 ? 'Expert SEO WordPress' : i === 4 ? 'Experte IA / Automatisation' : `Spécialiste numérique ${i + 1}`,
  domain: DOMAINS[i % DOMAINS.length],
  rating: Math.round((3.5 + (i % 15) * 0.1) * 10) / 10,
  reviewCount: (i % 80) + 5,
  location: ['Paris, France', 'Lyon, France', 'Marseille, France', 'Bordeaux, France', 'Toulouse, France'][i % 5],
  availability: i % 4 !== 0 ? 'available' : 'busy',
  hourlyRate: [50, 80, 100, 120, 150, 180, 200][i % 7],
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
}))

export function DirectoryContent() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedDomain, setSelectedDomain] = useState(searchParams.get('domain') || '')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  const filtered = MOCK_EXPERTS.filter(e => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase()) || e.domain.toLowerCase().includes(search.toLowerCase())
    const matchDomain = !selectedDomain || e.domain === selectedDomain
    const matchAvail = !availabilityFilter || e.availability === availabilityFilter
    return matchSearch && matchDomain && matchAvail
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => { setPage(1) }, [search, selectedDomain, availabilityFilter])

  return (
    <div className="container-fluid py-8">
      <div className="py-6 mb-4">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Répertoire des experts</h1>
        <p style={{ color: 'var(--color-secondary)' }}>{filtered.length} experts disponibles</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-secondary)' }} />
          <input type="text" placeholder="Rechercher un expert, une compétence..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
          />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
        >
          <Filter size={16} /> Filtres
          {(selectedDomain || availabilityFilter) && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />}
        </button>
      </div>

      {showFilters && (
        <div className="p-4 rounded-xl mb-6 flex flex-wrap gap-4" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-secondary)' }}>Domaine</p>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map(d => (
                <button key={d} onClick={() => setSelectedDomain(selectedDomain === d ? '' : d)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={{ backgroundColor: selectedDomain === d ? 'var(--color-accent)' : 'var(--color-background)', color: selectedDomain === d ? 'white' : 'var(--color-foreground)', border: '1px solid var(--color-border)' }}
                >{d}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-secondary)' }}>Disponibilité</p>
            <div className="flex gap-2">
              {[{ v: 'available', l: 'Disponible' }, { v: 'busy', l: 'Occupé' }].map(o => (
                <button key={o.v} onClick={() => setAvailabilityFilter(availabilityFilter === o.v ? '' : o.v)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={{ backgroundColor: availabilityFilter === o.v ? 'var(--color-primary)' : 'var(--color-background)', color: availabilityFilter === o.v ? 'var(--color-on-primary)' : 'var(--color-foreground)', border: '1px solid var(--color-border)' }}
                >{o.l}</button>
              ))}
            </div>
          </div>
          {(selectedDomain || availabilityFilter) && (
            <button onClick={() => { setSelectedDomain(''); setAvailabilityFilter('') }}
              className="flex items-center gap-1 text-xs font-medium self-end"
              style={{ color: 'var(--color-destructive)' }}
            ><X size={12} /> Effacer</button>
          )}
        </div>
      )}

      {paginated.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-secondary)' }}>
          <p className="text-lg font-semibold mb-2">Aucun expert trouvé</p>
          <p className="text-sm">Essayez de modifier vos critères</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginated.map(expert => (
            <Link key={expert.id} href={`/directory/${expert.id}`}
              className="p-5 rounded-xl card-hover block"
              style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={expert.avatar} alt={expert.name} className="w-11 h-11 rounded-full" style={{ border: '2px solid var(--color-border)' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-foreground)' }}>{expert.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-secondary)' }}>{expert.title}</p>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>
                {expert.domain}
              </span>
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-secondary)' }}>
                <span className="flex items-center gap-1"><Star size={11} style={{ color: '#F59E0B', fill: '#F59E0B' }} />{expert.rating} ({expert.reviewCount})</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: expert.availability === 'available' ? '#10B981' : '#F59E0B' }} />
                  {expert.availability === 'available' ? 'Dispo' : 'Occupé'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs mt-2" style={{ color: 'var(--color-secondary)' }}>
                <MapPin size={11} /> {expert.location}
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
          >Précédent</button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className="w-9 h-9 rounded-lg text-sm font-medium"
              style={{ backgroundColor: page === p ? 'var(--color-accent)' : 'transparent', color: page === p ? 'white' : 'var(--color-foreground)', border: '1px solid var(--color-border)' }}
            >{p}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
          >Suivant</button>
        </div>
      )}
    </div>
  )
}
