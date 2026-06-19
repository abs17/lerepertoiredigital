-- Migration 001 — Initial schema for Le Répertoire Digital
-- Tables: experts, leads, events

-- experts
CREATE TABLE IF NOT EXISTS experts (
  id            TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name          TEXT        NOT NULL,
  title         TEXT        NOT NULL,
  bio           TEXT        NOT NULL DEFAULT '',
  avatar        TEXT        NOT NULL DEFAULT '',
  domain        TEXT[]      NOT NULL DEFAULT '{}',
  description   TEXT        NOT NULL DEFAULT '',
  rating        NUMERIC(3,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count  INTEGER     NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  hourly_rate   INTEGER     NOT NULL DEFAULT 0 CHECK (hourly_rate >= 0),
  availability  TEXT        NOT NULL DEFAULT 'available'
                            CHECK (availability IN ('available', 'busy')),
  location      TEXT        NOT NULL DEFAULT '',
  links         JSONB       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- leads
CREATE TABLE IF NOT EXISTS leads (
  id          TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  first_name  TEXT        NOT NULL,
  last_name   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT        NOT NULL DEFAULT '',
  company     TEXT        NOT NULL DEFAULT '',
  source      TEXT        NOT NULL DEFAULT 'directory'
                          CHECK (source IN ('directory', 'event', 'referral')),
  status      TEXT        NOT NULL DEFAULT 'new'
                          CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'rejected')),
  expert_id   TEXT        REFERENCES experts(id) ON DELETE SET NULL,
  notes       TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- events
CREATE TABLE IF NOT EXISTS events (
  id          TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  date        TIMESTAMPTZ NOT NULL,
  location    TEXT        NOT NULL DEFAULT '',
  capacity    INTEGER     NOT NULL DEFAULT 0 CHECK (capacity >= 0),
  registered  INTEGER     NOT NULL DEFAULT 0 CHECK (registered >= 0),
  status      TEXT        NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft', 'published', 'happening', 'done')),
  image       TEXT        NOT NULL DEFAULT '',
  -- speakers stored as expert IDs; join at query time
  speaker_ids TEXT[]      NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER experts_updated_at BEFORE UPDATE ON experts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_experts_domain     ON experts USING GIN (domain);
CREATE INDEX IF NOT EXISTS idx_experts_availability ON experts (availability);
CREATE INDEX IF NOT EXISTS idx_leads_status       ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_expert_id    ON leads (expert_id);
CREATE INDEX IF NOT EXISTS idx_events_date        ON events (date);
CREATE INDEX IF NOT EXISTS idx_events_status      ON events (status);

-- Row Level Security (enable but allow anon read for public directory)
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE events  ENABLE ROW LEVEL SECURITY;

-- Public read on experts and events; leads require auth
CREATE POLICY "experts_public_read"  ON experts FOR SELECT USING (true);
CREATE POLICY "events_public_read"   ON events  FOR SELECT USING (true);
CREATE POLICY "leads_auth_read"      ON leads   FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "leads_anon_insert"    ON leads   FOR INSERT WITH CHECK (true);
