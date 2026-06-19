'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) { setError('Tous les champs sont requis.'); return }
    if (form.password.length < 6) { setError('Mot de passe minimum 6 caractères.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    localStorage.setItem('lrd_user', JSON.stringify({ id: 'user-new', email: form.email, name: form.name, role: 'user' }))
    localStorage.setItem('lrd_token', 'fake-jwt-' + Date.now())
    setLoading(false)
    router.push('/dashboard')
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
  const inputStyle = { backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70" style={{ color: 'var(--color-secondary)' }}>
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>

        <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-foreground)' }}>Créer un compte</h1>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>Rejoignez la plateforme Le Répertoire Digital</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: 'var(--color-destructive)' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Nom complet', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'vous@exemple.com' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>{f.label}</label>
                <input
                  type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                  onChange={e => update(f.key, e.target.value)} required
                  className={inputClass} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'} placeholder="Min. 6 caractères"
                  value={form.password} onChange={e => update('password', e.target.value)} required
                  className={`${inputClass} pr-11`} style={inputStyle}
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
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-secondary)' }}>
            Déjà un compte ?{' '}
            <Link href="/login" className="font-medium" style={{ color: 'var(--color-accent)' }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
