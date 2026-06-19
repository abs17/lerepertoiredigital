import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Calistoga } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-calistoga",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Le Répertoire Digital - Plateforme B2B d'Experts du Numérique",
  description: "Découvrez et connectez-vous avec les meilleurs experts en IT, SEO, UX/UI, IA, et bien plus.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${calistoga.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
