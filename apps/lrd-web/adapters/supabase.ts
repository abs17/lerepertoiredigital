/**
 * Supabase adapter — replaces MSW /api/experts, /api/leads, /api/events
 * Requires env vars: SUPABASE_URL, SUPABASE_ANON_KEY
 * Install: npm install @supabase/supabase-js
 */
import type { Expert, Lead, Event } from '@/shared/types';

const BASE = `${process.env.SUPABASE_URL}/rest/v1`;
const KEY = process.env.SUPABASE_ANON_KEY ?? '';

const baseHeaders: HeadersInit = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
};

// --- Row types (DB snake_case → TS camelCase) ---

interface ExpertRow {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  domain: string[];
  description: string;
  rating: number;
  review_count: number;
  hourly_rate: number;
  availability: 'available' | 'busy';
  location: string;
  links: { portfolio?: string; linkedin?: string; github?: string };
}

interface LeadRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  source: 'directory' | 'event' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  expert_id?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface EventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registered: number;
  status: 'draft' | 'published' | 'happening' | 'done';
  image: string;
  speakers: Expert[];
}

// --- Mappers ---

function toExpert(r: ExpertRow): Expert {
  return {
    id: r.id,
    name: r.name,
    title: r.title,
    bio: r.bio,
    avatar: r.avatar,
    domain: r.domain as Expert['domain'],
    description: r.description,
    rating: r.rating,
    reviewCount: r.review_count,
    hourlyRate: r.hourly_rate,
    availability: r.availability,
    location: r.location,
    links: r.links,
  };
}

function toLead(r: LeadRow): Lead {
  return {
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    company: r.company,
    source: r.source,
    status: r.status,
    expertId: r.expert_id,
    notes: r.notes,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

function toEvent(r: EventRow): Event {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    date: new Date(r.date),
    location: r.location,
    capacity: r.capacity,
    registered: r.registered,
    status: r.status,
    image: r.image,
    speakers: r.speakers ?? [],
  };
}

/** Parse total count from PostgREST Content-Range header (e.g. "0-11/50" → 50) */
function parseCount(contentRange: string | null): number {
  if (!contentRange) return 0;
  const match = contentRange.match(/\/(\d+)$/);
  return match ? parseInt(match[1], 10) : 0;
}

// --- Experts ---

export async function getExperts(params: {
  search?: string;
  domain?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Expert[]; total: number; page: number; limit: number; pages: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;
  const offset = (page - 1) * limit;

  const qs = new URLSearchParams({ select: '*', limit: String(limit), offset: String(offset) });
  if (params.search) qs.set('or', `(name.ilike.*${params.search}*,title.ilike.*${params.search}*)`);
  if (params.domain) qs.set('domain', `cs.{"${params.domain}"}`);

  const res = await fetch(`${BASE}/experts?${qs}`, {
    headers: { ...baseHeaders, Prefer: 'count=exact' },
  });
  if (!res.ok) throw new Error(`Supabase experts: ${res.status}`);

  const rows: ExpertRow[] = await res.json();
  const total = parseCount(res.headers.get('Content-Range'));

  return { data: rows.map(toExpert), total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getExpertById(id: string): Promise<{ data: Expert }> {
  const res = await fetch(`${BASE}/experts?id=eq.${id}&select=*`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`Supabase experts/${id}: ${res.status}`);

  const rows: ExpertRow[] = await res.json();
  if (rows.length === 0) throw Object.assign(new Error('Not found'), { status: 404 });

  return { data: toExpert(rows[0]) };
}

// --- Leads ---

export async function getLeads(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Lead[]; total: number; page: number; limit: number; pages: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const offset = (page - 1) * limit;

  const qs = new URLSearchParams({ select: '*', limit: String(limit), offset: String(offset) });

  const res = await fetch(`${BASE}/leads?${qs}`, {
    headers: { ...baseHeaders, Prefer: 'count=exact' },
  });
  if (!res.ok) throw new Error(`Supabase leads: ${res.status}`);

  const rows: LeadRow[] = await res.json();
  const total = parseCount(res.headers.get('Content-Range'));

  return { data: rows.map(toLead), total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getLeadById(id: string): Promise<{ data: Lead }> {
  const res = await fetch(`${BASE}/leads?id=eq.${id}&select=*`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`Supabase leads/${id}: ${res.status}`);

  const rows: LeadRow[] = await res.json();
  if (rows.length === 0) throw Object.assign(new Error('Not found'), { status: 404 });

  return { data: toLead(rows[0]) };
}

export async function createLead(body: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  source?: Lead['source'];
  expertId?: string;
  notes?: string;
}): Promise<Lead> {
  const payload = {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    phone: body.phone ?? '',
    company: body.company ?? '',
    source: body.source ?? 'directory',
    status: 'new',
    expert_id: body.expertId,
    notes: body.notes ?? '',
  };

  const res = await fetch(`${BASE}/leads`, {
    method: 'POST',
    headers: { ...baseHeaders, Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase leads POST: ${res.status}`);

  const rows: LeadRow[] = await res.json();
  return toLead(rows[0]);
}

// --- Events ---

export async function getEvents(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const offset = (page - 1) * limit;

  const qs = new URLSearchParams({ select: '*', limit: String(limit), offset: String(offset) });

  const res = await fetch(`${BASE}/events?${qs}`, {
    headers: { ...baseHeaders, Prefer: 'count=exact' },
  });
  if (!res.ok) throw new Error(`Supabase events: ${res.status}`);

  const rows: EventRow[] = await res.json();
  const total = parseCount(res.headers.get('Content-Range'));

  return { data: rows.map(toEvent), total, page, limit };
}
