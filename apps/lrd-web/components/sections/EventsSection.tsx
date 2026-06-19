import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

const events = [
  { id: 'evt-1', title: 'Discovery Event', date: '19 Mai 2025', time: '10h00 - 20h00', location: 'Paris, France', registered: 48, capacity: 200, status: 'published' },
  { id: 'evt-2', title: 'Webinar: SEO & IA', date: '22 Mai 2025', time: '14h00 - 16h00', location: 'En ligne', registered: 120, capacity: 300, status: 'published' },
]

export function EventsSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--color-muted)' }}>
      <div className="container-fluid">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Événements à venir</h2>
            <p style={{ color: 'var(--color-secondary)' }}>Rencontrez la communauté en présentiel et en ligne</p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            Tous les événements <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="p-6 rounded-xl card-hover" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(161,98,7,0.1)', color: 'var(--color-accent)' }}>
                  À venir
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-foreground)' }}>{event.title}</h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
                  <Calendar size={14} /> {event.date} · {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
                  <MapPin size={14} /> {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
                  <Users size={14} /> {event.registered} / {event.capacity} inscrits
                </div>
              </div>
              <div className="mb-4">
                <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%`, backgroundColor: 'var(--color-accent)' }} />
                </div>
              </div>
              <Link href="/signup" className="btn-primary text-sm w-full text-center block">
                S'inscrire
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
