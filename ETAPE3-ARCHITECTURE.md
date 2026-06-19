# Étape 3 : Architecture Détaillée + Wireframes + Structure GitHub

**Date** : 2026-06-19  
**Status** : 🎨 Design System ✅ → Architecture Design  
**Target** : MVP Phase 1 (Front-end local, mocks robustes)

---

## 1. Architecture Technique Globale

### Stack
- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript strict (tsconfig.json: `strict: true`)
- **Styling** : TailwindCSS v4 + Shadcn/ui
- **State Management** : Zustand (stores)
- **Data Fetching** : TanStack Query (React Query)
- **Forms** : React Hook Form + Zod (validation)
- **Animation** : Framer Motion
- **Icons** : Lucide React
- **Mocks** : MSW (Mock Service Worker) + Faker.js (fake data)
- **Theme** : next-themes (dark mode native)
- **Auth Mock** : localStorage + JWT-like tokens (frontend-only)

### Architecture Pattern
**Feature-Driven + Clean Architecture (simplified)**

```
Layered separation:
- UI Layer (components, pages, widgets)
- Business Logic (services, hooks)
- State (stores, mocks)
- Data Models (types, entities)
- External Integration (adapters, connectors)
```

---

## 2. Folder Structure

```
apps/lrd-web/
│
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout
│   ├── page.tsx                            # Landing page
│   ├── error.tsx / not-found.tsx
│   │
│   ├── (auth)/                             # Auth group (no sidebar)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   │
│   ├── (app)/                              # Protected routes (with sidebar)
│   │   ├── layout.tsx                      # Sidebar + nav layout
│   │   ├── directory/
│   │   │   ├── page.tsx                    # Répertoire (search + grid)
│   │   │   └── [id]/page.tsx               # Expert detail (modal or page)
│   │   ├── dashboard/
│   │   │   └── page.tsx                    # SaaS dashboard (KPIs, leads, events)
│   │   ├── analytics/
│   │   │   └── page.tsx                    # Analytics (charts, funnel, etc.)
│   │   ├── admin/
│   │   │   ├── page.tsx                    # Admin list (experts, events)
│   │   │   └── [resource]/page.tsx         # Admin detail (edit expert)
│   │   └── settings/
│   │       └── page.tsx                    # User settings, integrations
│   │
│   └── api/                                # Route handlers (mock endpoints)
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── signup/route.ts
│       ├── experts/
│       │   ├── route.ts                    # GET /api/experts (list + search)
│       │   └── [id]/route.ts               # GET /api/experts/:id
│       ├── leads/
│       │   ├── route.ts                    # GET/POST leads
│       │   └── [id]/route.ts               # GET/PUT leads/:id
│       ├── events/
│       │   └── route.ts                    # GET events
│       ├── integrations/
│       │   └── [provider]/route.ts         # Mock HubSpot, LinkedIn, etc.
│       └── analytics/
│           └── route.ts                    # GET analytics data
│
├── features/                               # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── stores/
│   │   │   └── authStore.ts                # Zustand
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── directory/                          # Répertoire feature
│   │   ├── components/
│   │   │   ├── ExpertCard.tsx
│   │   │   ├── ExpertGrid.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── ExpertDetail.tsx            # Modal or detail page
│   │   │   └── ContactExpertModal.tsx
│   │   ├── hooks/
│   │   │   ├── useExpertSearch.ts
│   │   │   ├── useExpertFilters.ts
│   │   │   └── useContactExpert.ts
│   │   ├── services/
│   │   │   ├── expertService.ts
│   │   │   └── filterService.ts
│   │   ├── stores/
│   │   │   └── directoryStore.ts           # Search, filters, pagination
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── widgets/
│   │       └── DirectoryLayout.tsx
│   │
│   ├── dashboard/                          # SaaS dashboard
│   │   ├── components/
│   │   │   ├── KPICard.tsx
│   │   │   ├── LeadsList.tsx
│   │   │   ├── EventsCalendar.tsx
│   │   │   ├── PipelineChart.tsx
│   │   │   └── ConnectionWidget.tsx        # "Connect HubSpot" etc.
│   │   ├── hooks/
│   │   │   ├── useDashboardData.ts
│   │   │   ├── useLeads.ts
│   │   │   └── useEvents.ts
│   │   ├── services/
│   │   │   └── dashboardService.ts
│   │   ├── stores/
│   │   │   └── dashboardStore.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── FunnelChart.tsx
│   │   │   ├── ConversionMetrics.tsx
│   │   │   ├── LeadSourceChart.tsx
│   │   │   └── ExportButton.tsx
│   │   ├── hooks/
│   │   │   └── useAnalyticsData.ts
│   │   ├── services/
│   │   │   └── analyticsService.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   └── admin/
│       ├── components/
│       │   ├── ExpertManager.tsx           # CRUD list
│       │   ├── ExpertForm.tsx              # Create / Edit
│       │   ├── EventManager.tsx
│       │   └── EventForm.tsx
│       ├── hooks/
│       │   ├── useExpertManager.ts
│       │   └── useEventManager.ts
│       ├── services/
│       │   └── adminService.ts
│       └── types/
│           └── index.ts
│
├── shared/
│   ├── components/                         # Reusable UI
│   │   ├── ui/                             # Shadcn/ui exports
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ... (shadcn components)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   └── common/
│   │       ├── Logo.tsx
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── Chip.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── Toast.tsx
│   │
│   ├── hooks/
│   │   ├── useMedia.ts                     # Responsive media queries
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useAsync.ts
│   │   └── useTheme.ts                     # Dark mode toggle
│   │
│   ├── lib/
│   │   ├── cn.ts                           # classnames utility
│   │   ├── format.ts                       # Format dates, numbers, etc.
│   │   ├── api.ts                          # API client (fetch wrapper)
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── types/
│   │   ├── index.ts                        # Global types
│   │   ├── api.ts
│   │   └── domain.ts
│   │
│   └── stores/
│       ├── useAppStore.ts                  # Global UI state (theme, sidebar, etc.)
│       └── useNotificationStore.ts         # Toast/notifications
│
├── mocks/                                  # Mock data & MSW
│   ├── handlers.ts                         # MSW request handlers
│   ├── db.ts                               # Fake database (with Faker)
│   ├── data/
│   │   ├── experts.ts
│   │   ├── leads.ts
│   │   ├── events.ts
│   │   └── analytics.ts
│   └── server.ts                           # MSW server setup
│
├── adapters/                               # External integrations (Phase 2)
│   ├── directus.ts                         # Future: Directus adapter
│   ├── supabase.ts                         # Future: Supabase adapter
│   └── pocketbase.ts                       # Future: PocketBase adapter
│
├── connectors/                             # Third-party API clients (Phase 2)
│   ├── hubspot.ts                          # Future: HubSpot connector
│   ├── linkedin.ts                         # Future: LinkedIn connector
│   ├── calendly.ts                         # Future: Calendly connector
│   └── stripe.ts                           # Future: Stripe connector
│
├── entities/                               # Core domain models
│   ├── Expert.ts
│   ├── Lead.ts
│   ├── Event.ts
│   ├── User.ts
│   └── Integration.ts
│
├── services/                               # Business logic layer
│   ├── expertService.ts
│   ├── leadService.ts
│   ├── eventService.ts
│   └── analyticsService.ts
│
├── widgets/                                # Composite widget components
│   ├── HeroSection.tsx
│   ├── CTASection.tsx
│   ├── TestimonialCarousel.tsx
│   └── TrustBadges.tsx
│
├── public/
│   ├── images/
│   │   ├── experts/                        # Expert headshots
│   │   ├── logos/                          # Partner logos (mock)
│   │   └── illustrations/
│   └── fonts/
│
├── styles/
│   ├── globals.css                         # TailwindCSS directives
│   ├── animations.css                      # Custom animations
│   └── themes.css                          # Dark mode CSS vars
│
├── .env.example
├── .env.local                              # (gitignored)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 3. Core Entities / Domain Models

```typescript
// entities/Expert.ts
interface Expert {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  domain: Domain[];              // ['SEO', 'Dev Web', 'UX', etc.]
  description: string;           // Long-form bio
  rating: number;                // 4.5, etc.
  reviewCount: number;
  hourlyRate: number;
  availability: 'available' | 'busy';
  location: string;
  links: {
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };
  services: Service[];
}

// entities/Lead.ts
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  source: 'directory' | 'event' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  expertId: string;               // If from expert detail
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// entities/Event.ts
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string | 'online';
  capacity: number;
  registered: number;
  status: 'draft' | 'published' | 'happening' | 'done';
  image: string;
  speakers: Expert[];
  cta: string;
}

// entities/User.ts
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar: string;
  createdAt: Date;
}

// entities/Integration.ts
interface Integration {
  id: string;
  provider: 'hubspot' | 'linkedin' | 'calendly' | 'stripe' | 'brevo' | 'mailchimp';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  config: Record<string, any>;
}
```

---

## 4. Pages & Wireframes

### Page 1: Landing (Public)
**Route:** `/`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER / NAV                            │
│  Logo  [Search Bar Teaser]  [Login] [Sign Up]                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         HERO SECTION                            │
│                                                                 │
│     Title: "Découvrez les experts du numérique"                │
│     Subtitle: "Accédez à un réseau de 500+ professionnels"     │
│                                                                 │
│     [Search Bar] [Browse Directory]                             │
│                                                                 │
│     Background: Glassmorphic cards + gradient blur             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    VALUE PROPOSITIONS (7 items)                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ...                   │
│  │ IT/Dev  │  │  SEO    │  │ UX/UI   │                        │
│  │ icon    │  │  icon   │  │ icon    │                        │
│  │ text    │  │  text   │  │ text    │                        │
│  └─────────┘  └─────────┘  └─────────┘                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FEATURED EXPERTS (6 cards)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │ Avatar   │  │ Avatar   │  │ Avatar   │                    │
│  │ Name     │  │ Name     │  │ Name     │                    │
│  │ Title    │  │ Title    │  │ Title    │                    │
│  │ [Discover│  │[Discover │  │[Discover │                    │
│  └──────────┘  └──────────┘  └──────────┘                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    TRUST SECTION                               │
│  Partenaires: [Logo] [Logo] [Logo]                             │
│  Stats: "5000+ leads associés | 500+ experts | 99% satisfaction"│
├─────────────────────────────────────────────────────────────────┤
│                    TESTIMONIALS (3 carousel)                   │
│    "Excellent service..." - Jane Doe, CEO Startup             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EVENTS SECTION                              │
│  Upcoming Discovery Event - May 19 - [Register]                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    CTA SECTION (Final)                         │
│     "Ready to grow your network?"                              │
│     [Explore Directory] [Contact us]                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         FOOTER                                 │
│  Links, Social, Newsletter                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- Header (Logo, Search teaser, Auth links)
- Hero (Title, Subtitle, Search + CTA buttons)
- ValueProps (7 cards, grid 3-cols desktop)
- FeaturedExperts (6 cards, 3-cols desktop)
- TrustBadges (Logos + stats)
- Testimonials (Carousel, 3 items)
- EventsSection (Upcoming event teaser)
- FinalCTA (Large section)
- Footer

---

### Page 2: Directory (Protected, Authenticated)
**Route:** `/directory`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    HEADER / NAV (with Sidebar)                │
│  Logo  [Search Bar]  [Theme]  [User Menu]                      │
├─────────────────────────────────────────────────────────────────┤
│      │  ┌─────────────────────────────────────────────────────┐ │
│      │  │              DIRECTORY PAGE                         │ │
│  S   │  ├─────────────────────────────────────────────────────┤ │
│  I   │  │  [Search] [Filters ▼]  [Sort ▼]                   │ │
│  D   │  │  Results: 42 experts                               │ │
│  E   │  ├─────────────────────────────────────────────────────┤ │
│  B   │  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │ │
│  A   │  │  │Card  │  │Card  │  │Card  │  │Card  │           │ │
│  R   │  │  │Expert│  │Expert│  │Expert│  │Expert│           │ │
│      │  │  └──────┘  └──────┘  └──────┘  └──────┘           │ │
│  -   │  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │ │
│  D   │  │  │Card  │  │Card  │  │Card  │  │Card  │           │ │
│  i   │  │  │Expert│  │Expert│  │Expert│  │Expert│           │ │
│  r   │  │  └──────┘  └──────┘  └──────┘  └──────┘           │ │
│  e   │  │                                                     │ │
│  c   │  │  [Previous] [1] [2] [3] [Next]                    │ │
│  t   │  │                                                     │ │
│  o   │  └─────────────────────────────────────────────────────┘ │
│  r   │                                                         │
│  y   │                                                         │
│      │                                                         │
└─────────────────────────────────────────────────────────────────┘

// Filter Panel (side or modal on mobile)
┌─────────────┐
│ Filters     │
├─────────────┤
│ Domain ▼    │
│ ☑ SEO       │
│ ☑ Dev Web   │
│ ☑ UX/UI     │
│ ☑ IA        │
│ ...         │
├─────────────┤
│ Rating ▼    │
│ ★★★★★      │
│ ★★★★☆      │
│ ...         │
├─────────────┤
│ Availability│
│ ☑ Available │
│ ☑ Busy      │
├─────────────┤
│ [Clear All] │
│ [Apply]     │
└─────────────┘
```

**Components:**
- SearchBar (hero-sized, with debounce)
- FilterPanel (Collapse/Expand on mobile)
- ExpertCard (Avatar, name, title, domain badges, rating, CTA)
- ExpertGrid (Responsive: 4-cols → 3-cols → 2-cols → 1-col)
- Pagination (Previous/Next, page numbers)

**Interactions:**
- Search: debounced, instant results
- Filter: multi-select, apply button
- Click card: open DetailModal or navigate to detail page
- Hover: card lifts (shadow + translateY)

---

### Page 3: Expert Detail
**Route:** `/directory/[id]` or Modal overlay

**Layout (Page version):**
```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER / NAV                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXPERT DETAIL SECTION                       │
│                                                                 │
│  ┌─────────┐                                                   │
│  │ Avatar  │  Name: Nejme Abdelouafi                           │
│  │ (large) │  Title: Expert en développement commercial        │
│  └─────────┘  Rating: ★★★★★ (48 reviews)                      │
│               Location: Paris, France                          │
│               Availability: Available                          │
│                                                                 │
│               [Contact Expert] [Add to Leads]                 │
│                                                                 │
│  ───────────────────────────────────────────────────────────────│
│                                                                 │
│  About                                                          │
│  J'aide les entrepreneurs à développer et commercialiser       │
│  leurs idées innovantes...                                     │
│                                                                 │
│  Domain Expertise:                                             │
│  [Levée de fonds] [Dev commercial] [Coaching pitch]           │
│                                                                 │
│  Services:                                                      │
│  • Strategic consulting - €150/h                              │
│  • Pitch coaching - €120/h                                    │
│  • Growth strategy - €180/h                                   │
│                                                                 │
│  Links:                                                         │
│  [Portfolio] [LinkedIn] [GitHub]                              │
│                                                                 │
│  ───────────────────────────────────────────────────────────────│
│                                                                 │
│  Reviews (5)                                                    │
│  ★★★★★ "Excellent coach" - John Doe (2024-06-01)             │
│  ★★★★☆ "Great insights" - Jane Smith (2024-05-28)            │
│  ...                                                           │
│                                                                 │
│  ───────────────────────────────────────────────────────────────│
│                                                                 │
│  Other Experts in [Levée de fonds]:                           │
│  [Card] [Card] [Card]                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- ExpertHeader (Avatar, name, title, rating, location, availability)
- CTAButtons (Contact, Add to Leads)
- BioSection
- DomainBadges
- ServicesList
- ReviewsList (with pagination)
- RelatedExperts (carousel)

---

### Page 4: Dashboard (SaaS, Authenticated)
**Route:** `/dashboard`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    HEADER / NAV (Sidebar)                      │
│  Logo  [Breadcrumb: Dashboard]  [Theme] [User]                 │
├─────────────────────────────────────────────────────────────────┤
│      │  ┌─────────────────────────────────────────────────────┐ │
│  S   │  │              DASHBOARD PAGE                         │ │
│  I   │  ├─────────────────────────────────────────────────────┤ │
│  D   │  │  Welcome back, John!                               │ │
│  E   │  │  Last updated: 2 hours ago                         │ │
│  B   │  ├─────────────────────────────────────────────────────┤ │
│  A   │  │  KPI CARDS (4 columns)                             │ │
│  R   │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ...   │ │
│      │  │  │ Contacts │  │ Leads    │  │ Events   │         │ │
│      │  │  │   245    │  │   48     │  │    12    │         │ │
│      │  │  │ ↑ 12%    │  │ ↑ 8%     │  │ ↑ 25%    │         │ │
│      │  │  └──────────┘  └──────────┘  └──────────┘         │ │
│      │  ├─────────────────────────────────────────────────────┤ │
│      │  │  PIPELINE CHART (Line chart)                       │ │
│      │  │  ┌─────────────────────────────────────────────┐  │ │
│      │  │  │                                             │  │ │
│      │  │  │  Pipeline Value Trend (Last 30 days)       │  │ │
│      │  │  │                                             │  │ │
│      │  │  └─────────────────────────────────────────────┘  │ │
│      │  ├─────────────────────────────────────────────────────┤ │
│      │  │  RECENT LEADS (Table)                              │ │
│      │  │  ┌────────────────────────────────────────────┐    │ │
│      │  │  │ Name  │ Email  │ Status  │ Date   │ Action│    │ │
│      │  │  │ Jane  │ j@e.fr │ new     │ Today  │ [...] │    │ │
│      │  │  │ John  │ j@e.fr │ contacted │ Yest │ [...] │    │ │
│      │  │  └────────────────────────────────────────────┘    │ │
│      │  ├─────────────────────────────────────────────────────┤ │
│      │  │  UPCOMING EVENTS                                   │ │
│      │  │  • Discovery Event - May 19 - 48 registered      │ │
│      │  │  • Webinar: SEO Best Practices - May 22          │ │
│      │  ├─────────────────────────────────────────────────────┤ │
│      │  │  INTEGRATIONS WIDGET                              │ │
│      │  │  [Connect HubSpot ▶] [Connected LinkedIn ✓]      │ │
│      │  │  [Connect Calendly ▶] [Connect Stripe ▶]         │ │
│      │  │                                                     │ │
│      │  └─────────────────────────────────────────────────────┘ │
│      │                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- Sidebar (Navigation menu)
- KPICard (Title, value, trend, icon)
- PipelineChart (Framer Motion animated line chart)
- RecentLeadsTable (with sort/filter)
- EventsWidget
- IntegrationsWidget (Mock buttons)

---

### Page 5: Analytics
**Route:** `/analytics`

**Layout:**
```
KPI Summary (4 cards)
├─ Conversion Rate: 12.5%
├─ Lead Quality: 8.2/10
├─ Expert Engagement: 87%
└─ Event ROI: 4.2x

Funnel Chart:
├─ Visitors: 5,000 (100%)
├─ Browsed Experts: 2,000 (40%)
├─ Contacted Expert: 500 (10%)
└─ Converted: 60 (1.2%)

Lead Source Breakdown (Pie/Donut):
├─ Directory: 45%
├─ Events: 35%
├─ Referral: 15%
└─ Other: 5%

Domain Popularity (Bar chart):
├─ SEO: 450 contacts
├─ Dev Web: 380
├─ UX/UI: 320
└─ ...

[Export CSV]
```

---

### Page 6: Admin Panel
**Route:** `/admin`

**Layout:**
```
Tabs: [Experts] [Events] [Users] [Analytics]

// Experts tab
┌────────────────────────────────────┐
│ [+ Add Expert]  [Search]           │
├────────────────────────────────────┤
│ Name     │ Domain  │ Status │ Actions│
├────────────────────────────────────┤
│ Nejme    │ Levée   │ active │ [Edit] │
│ Azzedine │ Digital │ active │ [Edit] │
│ ...      │ ...     │ ...    │ ...    │
└────────────────────────────────────┘

// Edit Expert form
┌────────────────────────────────────┐
│ Name: [input]                      │
│ Title: [input]                     │
│ Domain: [multiselect]              │
│ Bio: [textarea]                    │
│ Avatar: [file upload]              │
│ [Cancel] [Save]                    │
└────────────────────────────────────┘
```

---

### Page 7: Settings
**Route:** `/settings`

**Layout:**
```
Tabs: [Profile] [Integrations] [Preferences]

// Profile
Name: [input]
Email: [input]
Avatar: [file upload]
[Save]

// Integrations
[Connect HubSpot]
[Connect LinkedIn]
[Connect Calendly]
[Connect Stripe]
... (all with OAuth mock buttons)

// Preferences
□ Email notifications
□ Dark mode (toggle)
□ Two-factor auth
[Save]
```

---

## 5. Mocks Strategy

### MSW (Mock Service Worker) Setup
```typescript
// mocks/handlers.ts
export const handlers = [
  // Auth
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      user: { id: '1', email: body.email, name: 'John Doe' },
      token: 'fake-jwt-token',
    });
  }),

  // Experts
  http.get('/api/experts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const domain = url.searchParams.get('domain') || '';
    
    // Filter from fake DB
    let results = mockDB.experts;
    if (search) results = results.filter(e => e.name.includes(search));
    if (domain) results = results.filter(e => e.domain.includes(domain));
    
    return HttpResponse.json({ data: results });
  }),

  // Leads
  http.post('/api/leads', async ({ request }) => {
    const body = await request.json();
    const newLead = { id: crypto.randomUUID(), ...body, createdAt: new Date() };
    mockDB.leads.push(newLead);
    return HttpResponse.json(newLead);
  }),

  // Analytics
  http.get('/api/analytics/funnel', () => {
    return HttpResponse.json({
      visitors: 5000,
      browsed: 2000,
      contacted: 500,
      converted: 60,
    });
  }),
];
```

### Fake Data (Faker.js)
```typescript
// mocks/db.ts
import { faker } from '@faker-js/faker';

export const mockDB = {
  experts: Array.from({ length: 50 }, (_, i) => ({
    id: `exp-${i}`,
    name: faker.person.fullName(),
    title: faker.company.catchPhrase(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatar(),
    domain: ['SEO', 'Dev Web', 'UX', 'IA'].slice(0, Math.random() * 3 + 1),
    rating: Math.round(Math.random() * 5 * 10) / 10,
    reviewCount: Math.floor(Math.random() * 50),
    hourlyRate: Math.floor(Math.random() * 200 + 50),
    availability: Math.random() > 0.5 ? 'available' : 'busy',
    location: faker.location.city(),
  })),

  leads: [],
  
  events: [
    {
      id: 'evt-1',
      title: 'Discovery Event',
      date: new Date('2024-05-19'),
      capacity: 200,
      registered: 48,
      status: 'published',
    },
  ],
};
```

---

## 6. State Management (Zustand)

```typescript
// shared/stores/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  sidebarOpen: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// features/directory/stores/directoryStore.ts
interface DirectoryState {
  searchQuery: string;
  filters: { domain?: string[]; availability?: string };
  sortBy: 'name' | 'rating' | 'recent';
  page: number;
  setSearchQuery: (q: string) => void;
  setFilters: (f: any) => void;
  setPage: (p: number) => void;
}

export const useDirectoryStore = create<DirectoryState>((set) => ({
  searchQuery: '',
  filters: {},
  sortBy: 'name',
  page: 1,
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilters: (f) => set({ filters: f }),
  setPage: (p) => set({ page: p }),
}));
```

---

## 7. GitHub Structure & Branching

### Repo Setup
```bash
git remote add origin https://github.com/saadia/lerepertoiredigital.git
git branch -M main
git push -u origin main
```

### Branch Strategy (Git Flow)
```
main                          # Production-ready
├── develop                   # Integration branch
│   ├── feature/landing       # Page feature
│   ├── feature/directory
│   ├── feature/dashboard
│   ├── feature/analytics
│   ├── feature/admin
│   ├── feature/auth
│   ├── feature/design-tokens
│   ├── feature/mocks
│   └── feature/responsive
│
└── hotfix/...               # Critical fixes
```

### GitHub Project Board (Kanban)
**Columns:**
- Backlog
- To Do
- In Progress
- Review
- Done

**Issues Categories:**
- `type:feature` — New feature
- `type:bug` — Bug fix
- `type:refactor` — Code refactor
- `type:docs` — Documentation
- `type:chore` — Chores (deps, etc.)

**Example Issues:**
```
[Feature] Landing Page - Hero Section
├─ Components: Hero, ValueProps, FeaturedExperts
├─ Design tokens: Typography, Spacing, Colors
├─ Responsive: 375px → 1440px
└─ Effort: 4h

[Feature] Directory - Search & Filters
├─ Components: SearchBar, FilterPanel, ExpertCard, Grid
├─ State: Zustand store + mocks
├─ Pagination: 12 per page
└─ Effort: 6h

[Feature] Dashboard - KPIs & Charts
├─ Components: KPICard, PipelineChart, LeadsList
├─ Mocks: Analytics endpoints
├─ Framer Motion: Chart animations
└─ Effort: 5h

[Feature] Auth - Login & Signup (Mock)
├─ Components: LoginForm, SignupForm
├─ Storage: localStorage JWT mock
├─ Validation: Zod schemas
└─ Effort: 3h

[Feature] Admin Panel - Expert Management
├─ Components: ExpertList, ExpertForm (CRUD)
├─ Mocks: POST/PUT/DELETE endpoints
└─ Effort: 4h

[Feature] Responsive Design
├─ Breakpoints: 375, 768, 1024, 1440
├─ Mobile-first approach
├─ Touch target validation (44×44)
└─ Effort: 3h

[Chore] MSW Mocks Setup
├─ Handlers: auth, experts, leads, events, analytics
├─ Fake data: Faker.js
└─ Effort: 2h

[Chore] Design Tokens Implementation
├─ Tailwind config
├─ CSS variables
├─ Dark mode setup
└─ Effort: 2h
```

---

## 8. Development Phases

### Phase 1a: Foundation (Days 1-2)
- [ ] Next.js project init
- [ ] Tailwind + shadcn/ui setup
- [ ] Design tokens (colors, typography, spacing)
- [ ] MSW + Faker setup
- [ ] Zustand stores
- [ ] Layout (Header, Sidebar, Footer)

### Phase 1b: Public Pages (Days 2-3)
- [ ] Landing page (hero, value props, featured, trust, events, CTA)
- [ ] Error pages (404, error boundary)

### Phase 1c: Auth & Directory (Days 3-4)
- [ ] Login / Signup (mock localStorage auth)
- [ ] Directory page (search, filters, grid)
- [ ] Expert detail (modal or page)
- [ ] Contact modal

### Phase 1d: Dashboard & Analytics (Days 4-5)
- [ ] Dashboard page (KPIs, pipeline, leads, events, integrations)
- [ ] Analytics page (funnel, charts, export)

### Phase 1e: Admin & Polish (Days 5-6)
- [ ] Admin panel (expert/event CRUD)
- [ ] Settings page (profile, integrations mock)
- [ ] Responsive design pass
- [ ] Dark mode
- [ ] Animations (Framer Motion)
- [ ] Accessibility audit (WCAG AA)

### Phase 1f: Testing & QA (Days 6-7)
- [ ] Cross-browser testing
- [ ] Mobile testing (375px, 768px)
- [ ] Lighthouse score (target: 95+)
- [ ] Performance audit
- [ ] Type checking (tsc --noEmit)
- [ ] Final review

---

## 9. Success Metrics (Phase 1)

- ✅ All pages functional locally
- ✅ Responsive: 375px → 1440px
- ✅ Dark mode working
- ✅ Auth mock working (localStorage)
- ✅ Mocks realistic (50+ experts, 100+ leads, events)
- ✅ TypeScript strict mode
- ✅ WCAG AA accessibility
- ✅ Lighthouse 95+ score
- ✅ Framer Motion animations smooth (60fps)
- ✅ Zero console errors

---

## 10. Next Steps After Phase 1

**Phase 2 Prep:**
- [ ] Adapters ready (Directus, Supabase, PocketBase)
- [ ] Connectors ready (HubSpot, LinkedIn, Calendly, Stripe)
- [ ] API client abstraction (ready for real backend)
- [ ] Database schema (Postgres, with migrations)
- [ ] Authentication (NextAuth.js or similar)
- [ ] Email notifications (Brevo, Mailchimp)

**Handoff to BMAD:**
- [ ] Repo: Clean, documented, production-ready
- [ ] Issues: Clear, prioritized, sized
- [ ] Design System: MASTER.md maintained
- [ ] Mocks: Realistic, extensible
- [ ] Architecture: Well-explained, scalable
- [ ] README: Setup + development guide

---

**Status** : ✅ Architecture detailed. Waiting for validation before code generation.

