'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BarChart2, Settings, Shield, LogOut, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/directory', icon: Users, label: 'Répertoire' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/admin', icon: Shield, label: 'Admin' },
  { href: '/settings', icon: Settings, label: 'Paramètres' },
]

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('lrd_user')
    localStorage.removeItem('lrd_token')
    router.push('/login')
  }

  return (
    <aside className="flex flex-col h-full" style={{ width: '220px', backgroundColor: 'var(--color-muted)', borderRight: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <Link href="/" className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>LRD</Link>
        {onClose && (
          <button onClick={onClose} className="p-1" style={{ color: 'var(--color-secondary)' }}><X size={18} /></button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? 'var(--color-accent)' : 'transparent',
                color: active ? 'white' : 'var(--color-secondary)',
              }}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-secondary)' }}
        >
          <LogOut size={17} /> Déconnexion
        </button>
      </div>
    </aside>
  )
}
