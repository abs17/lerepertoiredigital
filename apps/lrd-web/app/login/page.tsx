'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Tous les champs sont requis.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    localStorage.setItem('lrd_user', JSON.stringify({ id: 'user-1', email, name: 'John Doe', role: 'user' }))
    localStorage.setItem('lrd_token', 'fake-jwt-' + Date.now())
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70" style={{ color: 'var(--color-secondary)' }}>
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>

        <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>
              Connexion
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
              Accédez à votre espace Le Répertoire Digital
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: 'var(--color-destructive)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>Email</label>
              <input
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-11 rounded-lg text-sm outline-none transition-all"
                  style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-secondary)' }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-secondary)' }}>
            Pas encore de compte ?{' '}
            <Link href="/signup" className="font-medium" style={{ color: 'var(--color-accent)' }}>Créer un compte</Link>
          </p>

          <div className="mt-4 p-3 rounded-lg text-xs text-center" style={{ backgroundColor: 'rgba(161,98,7,0.05)', color: 'var(--color-secondary)' }}>
            Demo: entrez n'importe quel email/mot de passe
          </div>
        </div>
      </div>
    </div>
  )
}
