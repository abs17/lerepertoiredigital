'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', backdropFilter: 'blur(12px)' }}>
      <div className="container-fluid">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
              LRD
            </span>
            <span className="hidden md:block text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>
              Le Répertoire Digital
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/directory" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--color-foreground)' }}>
              Répertoire
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--color-foreground)' }}>
              Dashboard
            </Link>
            <Link href="/login" className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>
              Connexion
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Commencer
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md transition-opacity hover:opacity-70"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t flex flex-col gap-4" style={{ borderColor: 'var(--color-border)' }}>
            <Link href="/directory" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Répertoire</Link>
            <Link href="/dashboard" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link href="/login" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>Connexion</Link>
            <Link href="/signup" className="btn-primary text-sm w-fit" onClick={() => setMobileOpen(false)}>Commencer</Link>
          </div>
        )}
      </div>
    </header>
  )
}
