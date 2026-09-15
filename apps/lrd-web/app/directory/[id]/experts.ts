// Shared between the server page (which prerenders one HTML file per expert via
// `generateStaticParams`) and the client component that renders the detail view.
//
// Every field is derived deterministically from the index: the values are
// computed once at build time and again when React hydrates in the browser, so
// anything random here would produce a hydration mismatch. The rating and review
// formulas intentionally match `DirectoryContent` so a card and its detail page
// agree.

const DOMAINS = ['SEO', 'Dev Web', 'UX/UI', 'IA', 'Automatisation', 'Levée de fonds', 'Dev commercial', 'Digital nomade']
const LOCATIONS = ['Paris, France', 'Lyon, France', 'Marseille, France', 'Bordeaux, France', 'Toulouse, France']
const RATES = [50, 80, 100, 120, 150, 180, 200]

const NAMES = ['Nejme Abdelouafi', 'Azzedine Nebti', 'Elodie Allegro', 'Hamid El Haloui', 'Amina Marie']
const TITLES = [
  'Expert développement commercial & levée de fonds',
  'Entrepreneur/Coach/Formateur',
  'Développeuse Web',
  'Expert SEO WordPress',
  'Experte IA / Automatisation',
]
const BIOS: Record<number, string> = {
  0: "Tu as une idée ? J'ai la méthode pour la développer et la commercialiser. Fort d'une expérience de 10 ans dans le développement commercial et la levée de fonds, j'accompagne entrepreneurs et startups dans la structuration et la commercialisation de leurs projets innovants.",
  1: "Coach et formateur spécialisé dans le développement professionnel en ligne. J'aide mes clients à travailler de n'importe où dans le monde tout en développant une activité durable et rentable.",
  4: "Formatrice et Consultante IA spécialisée en automatisation des processus métier. Développement d'agents IA, chatbots, et assistants virtuels sur-mesure. Formations pratiques pour équipes et entrepreneurs.",
}

export type Expert = (typeof MOCK_EXPERTS)[number]

export const MOCK_EXPERTS = Array.from({ length: 50 }, (_, i) => ({
  id: `exp-${i + 1}`,
  name: NAMES[i] ?? `Expert ${i + 1}`,
  title: TITLES[i] ?? `Spécialiste numérique ${i + 1}`,
  bio:
    BIOS[i] ??
    `Expert passionné avec ${5 + i} ans d'expérience dans son domaine. Accompagne les entreprises dans leur transformation numérique avec des résultats concrets et mesurables.`,
  domain: DOMAINS[i % DOMAINS.length],
  rating: Math.round((3.5 + (i % 15) * 0.1) * 10) / 10,
  reviewCount: (i % 80) + 5,
  location: LOCATIONS[i % LOCATIONS.length],
  availability: i % 4 !== 0 ? 'available' : 'busy',
  hourlyRate: RATES[i % RATES.length],
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  responseTime: '< 24h',
}))

export function getExpert(id: string): Expert {
  return MOCK_EXPERTS.find((e) => e.id === id) ?? MOCK_EXPERTS[0]
}
