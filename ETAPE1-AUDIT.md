# Étape 1 : Audit Complet – Analyse du Site Actuel

**Date** : 2026-06-19  
**Source** : https://lerepertoiredigital.fr/  
**Statut** : ✅ Contenu extrait et analysé

---

## 1. Contenu Extrait du Site Actuel

### Hero / Proposition de valeur
**Titre** : "Votre passerelle vers l'expertise numérique"

**Sous-titre** : "Le Répertoire Digital est une plateforme unique qui rassemble, en un seul espace, l'ensemble des experts et solutions nécessaires pour concrétiser et accélérer vos projets."

### Domaines / Catégories d'experts
1. **IT / Freelance IT** — accompagnement carrière freelance
2. **SEO** — visibilité en ligne, lead generation
3. **Développement Web** — création de sites performants
4. **UX/UI** — expérience utilisateur, design
5. **IA / Automatisation** — formations, chatbots, assistants virtuels
6. **Digital Nomade** — formation, coaching pour travailler partout
7. **Levée de fonds / Développement commercial** — coaching pitch, stratégie de croissance
8. **Design** — création web

### Experts listés (incomplet, mais identifiés)
- **Nejme Abdelouafi** — Expert développement commercial & levée de fonds
- **Azzedine Nebti** — Entrepreneur/Coach/Formateur (digital nomade)
- **Elodie Allegro** — Développeuse web
- **Hamid El Haloui** — Expert SEO WordPress
- **Amina Marie** — Experte IA / Automatisation

### Points de confiance / Trust elements
- ✅ Section "Notre équipe" avec profils détaillés
- ✅ Événement "Discovery Event" (19 mai)
- ✅ CTAs clairs : "Découvrir", "Contactez-nous", "En savoir plus"
- ⚠️ **Pas de logos partenaires ou certifications visibles sur la home**
- ⚠️ **Pas de témoignages clients ou cas d'usage explicites**

### Événements
- **Discovery Event** (19 mai) : journée complète 10:00 AM - 8:00 PM
- Options : achat unitaire, vente en bulk, paiement par facture

### CTAs Principaux
1. "Découvrez nos profils" (vers section Team)
2. "Découvrir" (vers fiche expert individuelle)
3. "Contactez-nous" (contact form)
4. "En savoir plus" (ambitieux mais manque détail)

---

## 2. Audit UX/UI du Site Actuel

### Points forts ✅
- **Structure claire** : Hero → Value props → Team → Events → Contact
- **Responsive images** : photos experts en WebP (optimisé)
- **Navigation simple** : directe et compréhensible
- **Contenu orienté métier** : vocabulaire juste, propositions pertinentes

### Points faibles ❌
- **Design vieillissant** : style WordPress standard (thème générique)
- **Peu de micro-interactions** : statique, manque d'engageante
- **Hiérarchie visuelle limitée** : peu de contraste premium
- **Manque de trust signals** : 0 témoignages, 0 partenaires, 0 certifications
- **Mobile UX floue** : pas de layout d'accueil mobile-first clair
- **Pas de dashboard/SaaS feeling** : c'est un site brochure, pas une plateforme
- **Performance** : pas d'indication de Lighthouse score (probablement < 75)
- **Pas de CRM/Lead tracking** : simple formulaire, sans automation visible
- **Pas d'intégration outils** : connexions HubSpot, LinkedIn, Calendly non visibles

### Design actuel
- Palette : Bleus/grays génériques
- Typographie : standard, pas de hiérarchie distinctive
- Spacing : serré, peu aéré
- Shadows/Effects : minimalistes (trop minimalistes, pas premium)
- Dark mode : aucun
- Animations : aucune

---

## 3. Positionnement Produit Actuel vs Cible

| Aspect | Actuel | Cible MVP |
|--------|--------|-----------|
| **Type** | Site brochure WordPress | Plateforme SaaS B2B |
| **UX Focus** | Présentation statique | Annuaire + Dashboard CRM |
| **Intégrations** | Aucune | HubSpot, LinkedIn, Calendly, Brevo, Stripe |
| **Auth** | Contact form simple | Login + Dashboard personnel |
| **Mobile** | Responsive basique | App-like, Native feel |
| **Design** | Standard WordPress | Premium, Glassmorphism, Dark mode |
| **Performance** | Inconnu | 95+ Lighthouse |
| **Scalabilité** | Manuelle (posts WP) | Données structurées, API-first |

---

## 4. MVP Phase 1 – Fonctionnalités à Livrer

### Page 1 : Landing / Hero Premium
- ✅ Hero section ultra-clean
- ✅ Value propositions animées
- ✅ Trust section (partenaires fictifs pour MVP)
- ✅ CTA vers Répertoire
- ✅ Footer smart

### Page 2 : Répertoire / Annuaire
- ✅ Grille experts (cartes premium)
- ✅ Filtres : domaines, expertise, localisation (mock)
- ✅ Recherche texte
- ✅ Fiche détaillée expert (modal ou page)
- ✅ CTA : "Contacter cet expert"

### Page 3 : Dashboard SaaS (auth mock)
- ✅ KPIs : Contacts, Leads, Événements, Pipeline
- ✅ Liste Leads / Prospects
- ✅ Événements calendar
- ✅ Connexions (mock : "Connecter HubSpot")
- ✅ Paramètres utilisateur

### Page 4 : Analytics
- ✅ Charts : conversion funnel, experts consultés, leads par domaine
- ✅ Export CSV (mock)

### Page 5 : Admin Léger
- ✅ Gestion experts (CRUD mock)
- ✅ Gestion événements
- ✅ Analytics avancées

### Features Transversales
- ✅ Auth mock (localStorage-based)
- ✅ Dark mode natif
- ✅ Responsive mobile-first
- ✅ Accessibility WCAG AA
- ✅ Mocks robustes pour toutes requêtes

---

## 5. Contenu à Réutiliser

### Textes core
- Hero : "Votre passerelle vers l'expertise numérique" + description (à sublimer)
- Value props : 7 domaines d'expertise (à détailler)
- Experts : 5+ profils avec titles et descriptions

### Experts à inclure (avec enrichissement)
```
[
  { id: 1, name: "Nejme Abdelouafi", title: "Expert en développement commercial & levée de fonds", bio: "Tu as une idée ? J'ai la méthode pour la développer et la commercialiser", domain: ["Levée de fonds", "Dev commercial"], image: "..." },
  { id: 2, name: "Azzedine Nebti", title: "Entrepreneur/Coach/Formateur", bio: "Travaille d'où tu veux, quand tu veux, même sans diplôme", domain: ["Digital nomade", "Entrepreneuriat"], image: "..." },
  { id: 3, name: "Elodie Allegro", title: "Développeuse Web", bio: "Création de sites performants et adaptés", domain: ["Dev Web"], image: "..." },
  { id: 4, name: "Hamid El Haloui", title: "Expert SEO WordPress", bio: "Spécialiste SEO — Visibilité + Leads", domain: ["SEO"], image: "..." },
  { id: 5, name: "Amina Marie", title: "Experte IA / Automatisation", bio: "Formatrice et Consultante IA — Agents IA, Chatbots, Assistants", domain: ["IA", "Automatisation"], image: "..." }
]
```

### Événements
- Discovery Event — 19 mai (date fictive à adapter)
- Pricing : ticket, bulk, facture

---

## 6. Propositions d'Amélioration UX/UI

### Design System
- **Palette** : Navy #001F3F + Slate #475569 + Teal #0D9488 + Cyan accent
- **Typography** : Geist / Inter pour corps, Geist Mono pour code
- **Components** : Shadcn/ui + customs premium
- **Animations** : Framer Motion, 200-300ms transitions
- **Dark mode** : natif, theme-provider

### Layout MVP
- Hero : "Hero avec gradient subtil + float cards"
- Répertoire : "Grid 3-cols (desktop) → 2-cols → 1-col (mobile)"
- Dashboard : "Sidebar + main content, grid de KPIs"
- Fiches expert : "Modal beautiful ou page dedicated"

### Micro-interactions
- Hover sur cartes experts : shadow lift + scale 1.02
- Filtres : smooth toggle + result count animation
- Forms : floating labels, validation feedback, success toast
- Auth : modal-based ou page, smooth transitions

### Trust signals (MVP)
- Section "Rejoints par 500+ experts et PME" (mock)
- Logos partenaires (8-10 fictifs, style Vercel/Stripe)
- "5 000+ leads réassociés en 2024" (mock KPI)
- Certifications (ISO, GDPR, etc. mock)

---

## 7. Architecture Technique (Validé)

### Stack
- **Framework** : Next.js 15 (App Router)
- **Lang** : TypeScript strict
- **Styling** : TailwindCSS + Shadcn/ui
- **State** : Zustand + TanStack Query
- **Forms** : React Hook Form + Zod
- **Animation** : Framer Motion
- **Mocks** : MSW (Mock Service Worker) ou simple providers

### Folder Structure
```
apps/lrd-web/
├── app/                        # Next.js app router
│   ├── layout.tsx
│   ├── page.tsx               # Landing
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (app)/                 # Protected routes
│   │   ├── directory/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── admin/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── auth/
│       ├── experts/
│       ├── leads/
│       └── events/
├── features/
│   ├── auth/                  # Auth logic
│   ├── directory/             # Répertoire
│   ├── dashboard/             # Dashboard SaaS
│   ├── analytics/             # Analytics
│   └── admin/                 # Admin panel
├── shared/
│   ├── components/            # Reusable UI
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utils, helpers
│   ├── types/                 # TypeScript types
│   └── stores/                # Zustand stores
├── mocks/                     # MSW + fake data
├── adapters/                  # Future: Directus, Supabase
├── connectors/                # Future: HubSpot, LinkedIn
├── widgets/                   # Composite widgets
├── entities/                  # Core domain models
├── services/                  # Business logic
└── public/
    ├── images/
    └── fonts/
```

---

## 8. Checklist Phase 1

- [ ] Design System généré via ui-ux-pro-max
- [ ] Architecture validée (TypeScript, Next.js, mocks)
- [ ] Wireframes textuels + structure GitHub
- [ ] Repo structuré + branches prêtes
- [ ] Landing page ultra-premium
- [ ] Répertoire complet (search, filters, detail)
- [ ] Dashboard SaaS (KPIs, leads, events)
- [ ] Auth mock (login/signup, localStorage)
- [ ] Admin panel léger
- [ ] Mocks robustes (providers, MSW)
- [ ] Responsive + Accessibility
- [ ] Prêt pour passation à équipe bmad

---

## 9. Prochaines Étapes

**Étape 2** : Générer Design System via `/ui-ux-pro-max`  
**Étape 3** : Présenter architecture détaillée + wireframes  
**Étape 4** : Attendre validation  
**Étape 5** : Code generation (progressive)

---

**Status** : ✅ Audit terminé. En attente de validation avant Étape 2.
