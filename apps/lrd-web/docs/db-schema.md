# DB Schema — Le Répertoire Digital

Migration file: `supabase/migrations/001_initial_schema.sql`

## Table: `experts`

| Column        | Type         | Constraints                        | Notes                              |
|---------------|--------------|------------------------------------|------------------------------------|
| id            | TEXT         | PK, default uuid                   |                                    |
| name          | TEXT         | NOT NULL                           |                                    |
| title         | TEXT         | NOT NULL                           | Short role/tagline                 |
| bio           | TEXT         | NOT NULL, default ''               |                                    |
| avatar        | TEXT         | NOT NULL, default ''               | URL                                |
| domain        | TEXT[]       | NOT NULL, default '{}'             | GIN-indexed; values from Domain type |
| description   | TEXT         | NOT NULL, default ''               | Long-form profile                  |
| rating        | NUMERIC(3,1) | 0–5                                |                                    |
| review_count  | INTEGER      | ≥ 0                                | Maps to `reviewCount` in TS        |
| hourly_rate   | INTEGER      | ≥ 0                                | Maps to `hourlyRate` in TS (EUR)   |
| availability  | TEXT         | 'available' \| 'busy'              |                                    |
| location      | TEXT         | NOT NULL, default ''               | "City, CountryCode"                |
| links         | JSONB        | default '{}'                       | `{ portfolio?, linkedin?, github? }` |
| created_at    | TIMESTAMPTZ  | default NOW()                      |                                    |
| updated_at    | TIMESTAMPTZ  | default NOW(), auto-trigger        |                                    |

**RLS**: public SELECT allowed.

---

## Table: `leads`

| Column     | Type        | Constraints                                              | Notes                       |
|------------|-------------|----------------------------------------------------------|-----------------------------|
| id         | TEXT        | PK, default uuid                                         |                             |
| first_name | TEXT        | NOT NULL                                                 | Maps to `firstName`         |
| last_name  | TEXT        | NOT NULL                                                 | Maps to `lastName`          |
| email      | TEXT        | NOT NULL                                                 |                             |
| phone      | TEXT        | NOT NULL, default ''                                     |                             |
| company    | TEXT        | NOT NULL, default ''                                     |                             |
| source     | TEXT        | 'directory' \| 'event' \| 'referral', default 'directory' |                           |
| status     | TEXT        | 'new' \| 'contacted' \| 'qualified' \| 'converted' \| 'rejected', default 'new' | |
| expert_id  | TEXT        | FK → experts(id) ON DELETE SET NULL, nullable            | Maps to `expertId`          |
| notes      | TEXT        | NOT NULL, default ''                                     |                             |
| created_at | TIMESTAMPTZ | default NOW()                                            | Maps to `createdAt`         |
| updated_at | TIMESTAMPTZ | default NOW(), auto-trigger                              | Maps to `updatedAt`         |

**RLS**: INSERT public (anon can submit a lead); SELECT requires `authenticated` role.

---

## Table: `events`

| Column      | Type        | Constraints                                            | Notes                        |
|-------------|-------------|--------------------------------------------------------|------------------------------|
| id          | TEXT        | PK, default uuid                                       |                              |
| title       | TEXT        | NOT NULL                                               |                              |
| description | TEXT        | NOT NULL, default ''                                   |                              |
| date        | TIMESTAMPTZ | NOT NULL                                               |                              |
| location    | TEXT        | NOT NULL, default ''                                   |                              |
| capacity    | INTEGER     | ≥ 0                                                    |                              |
| registered  | INTEGER     | ≥ 0                                                    |                              |
| status      | TEXT        | 'draft' \| 'published' \| 'happening' \| 'done', default 'draft' |               |
| image       | TEXT        | NOT NULL, default ''                                   | URL                          |
| speaker_ids | TEXT[]      | NOT NULL, default '{}'                                 | IDs from experts table; join at query time |
| created_at  | TIMESTAMPTZ | default NOW()                                          |                              |
| updated_at  | TIMESTAMPTZ | default NOW(), auto-trigger                            |                              |

**RLS**: public SELECT allowed.

---

## Indexes

| Index                     | Table   | Columns      | Type  | Purpose                        |
|---------------------------|---------|--------------|-------|--------------------------------|
| idx_experts_domain        | experts | domain       | GIN   | Domain filter in directory     |
| idx_experts_availability  | experts | availability | BTREE | Availability filter            |
| idx_leads_status          | leads   | status       | BTREE | Lead funnel views              |
| idx_leads_expert_id       | leads   | expert_id    | BTREE | Leads per expert lookups       |
| idx_events_date           | events  | date         | BTREE | Upcoming events ordering       |
| idx_events_status         | events  | status       | BTREE | Published events filter        |

---

## Adapter mapping summary

| MSW route          | Supabase table | Adapter function         |
|--------------------|----------------|--------------------------|
| GET /api/experts   | experts        | `getExperts(params)`     |
| GET /api/experts/:id | experts      | `getExpertById(id)`      |
| GET /api/leads     | leads          | `getLeads(params)`       |
| POST /api/leads    | leads          | `createLead(body)`       |
| GET /api/leads/:id | leads          | `getLeadById(id)`        |
| GET /api/events    | events         | `getEvents(params)`      |

Auth, analytics, and other MSW endpoints remain mocked until Phase 3.
