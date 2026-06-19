import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DirectoryContent } from './DirectoryContent'

export default function DirectoryPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <Suspense fallback={
          <div className="container-fluid py-20 text-center" style={{ color: 'var(--color-secondary)' }}>
            Chargement du répertoire...
          </div>
        }>
          <DirectoryContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
