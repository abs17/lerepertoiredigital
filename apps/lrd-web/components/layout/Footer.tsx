import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
      <div className="container-fluid py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Le Répertoire Digital</h3>
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
              Plateforme B2B d'experts du numérique. Découvrez, connectez, collaborez.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
              <li><Link href="/directory" className="hover:opacity-70">Répertoire</Link></li>
              <li><Link href="/dashboard" className="hover:opacity-70">Dashboard</Link></li>
              <li><Link href="/analytics" className="hover:opacity-70">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Experts</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
              <li><Link href="/directory?domain=SEO" className="hover:opacity-70">SEO</Link></li>
              <li><Link href="/directory?domain=IA" className="hover:opacity-70">IA & Automatisation</Link></li>
              <li><Link href="/directory?domain=Dev%20Web" className="hover:opacity-70">Dev Web</Link></li>
              <li><Link href="/directory?domain=UX%2FUI" className="hover:opacity-70">UX/UI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-secondary)' }}>
              <li><a href="mailto:contact@lerepertoiredigital.fr" className="hover:opacity-70">contact@lerepertoiredigital.fr</a></li>
              <li><Link href="/signup" className="hover:opacity-70">Rejoindre la plateforme</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary)' }}>
          <p>© 2024 Le Répertoire Digital. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-70">Politique de confidentialité</Link>
            <Link href="#" className="hover:opacity-70">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
