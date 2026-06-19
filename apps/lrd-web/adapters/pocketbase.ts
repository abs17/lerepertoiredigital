/**
 * PocketBase adapter — replaces MSW /api/experts, /api/leads, /api/events
 * Requires env var: POCKETBASE_URL
 * PocketBase REST API: https://pocketbase.io/docs/api-records/
 */
import type { Expert, Lead, Event } from '@/shared/types';

const BASE = process.env.POCKETBASE_URL ?? '';

const baseHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

// PocketBase wraps list responses in { page, perPage, totalItems, totalPages, items: T[] }

interface PBListResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

// PocketBase auto-adds: id, created, updated (ISO strings)
type PBRecord = { id: string; created: string; updated: string };

type PBExpert = PBRecord & Omit<Expert, 'id' | 'reviewCount' | 'hourlyRate'> & {
  reviewCount: number;
  hourlyRate: number;
};
type PBLead = PBRecord & Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'expertId'> & {
  expertId: string;
};
type PBEvent = PBRecord & Omit<Event, 'id' | 'date'> & { date: string };

function toExpert(r: PBExpert): Expert {
  return {
    id: r.id,
    name: r.name,
    title: r.title,
    bio: r.bio,
    avatar: r.avatar,
    domain: r.domain,
    description: r.description,
    rating: r.rating,
    reviewCount: r.reviewCount,
    hourlyRate: r.hourlyRate,
    availability: r.availability,
    location: r.location,
    links: r.links,
  };
}

function toLead(r: PBLead): Lead {
  return {
    id: r.id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    phone: r.phone,
    company: r.company,
    source: r.source,
    status: r.status,
    expertId: r.expertId || undefined,
    notes: r.notes,
    createdAt: new Date(r.created),
    updatedAt: new Date(r.updated),
  };
}

function toEvent(r: PBEvent): Event {
  return { ...r, id: r.id, date: new Date(r.date) };
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

  const qs = new URLSearchParams({ page: String(page), perPage: String(limit) });

  const filters: string[] = [];
  if (params.search) {
    filters.push(`(name~"${params.search}"||title~"${params.search}")`);
  }
  if (params.domain) {
    filters.push(`domain~"${params.domain}"`);
  }
  if (filters.length > 0) qs.set('filter', filters.join('&&'));

  const res = await fetch(`${BASE}/api/collections/experts/records?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`PocketBase experts: ${res.status}`);

  const json: PBListResponse<PBExpert> = await res.json();

  return {
    data: json.items.map(toExpert),
    total: json.totalItems,
    page: json.page,
    limit: json.perPage,
    pages: json.totalPages,
  };
}

export async function getExpertById(id: string): Promise<{ data: Expert }> {
  const res = await fetch(`${BASE}/api/collections/experts/records/${id}`, { headers: baseHeaders });
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw new Error(`PocketBase experts/${id}: ${res.status}`);

  const r: PBExpert = await res.json();
  return { data: toExpert(r) };
}

// --- Leads ---

export async function getLeads(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Lead[]; total: number; page: number; limit: number; pages: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const qs = new URLSearchParams({ page: String(page), perPage: String(limit) });

  const res = await fetch(`${BASE}/api/collections/leads/records?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`PocketBase leads: ${res.status}`);

  const json: PBListResponse<PBLead> = await res.json();

  return {
    data: json.items.map(toLead),
    total: json.totalItems,
    page: json.page,
    limit: json.perPage,
    pages: json.totalPages,
  };
}

export async function getLeadById(id: string): Promise<{ data: Lead }> {
  const res = await fetch(`${BASE}/api/collections/leads/records/${id}`, { headers: baseHeaders });
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw new Error(`PocketBase leads/${id}: ${res.status}`);

  const r: PBLead = await res.json();
  return { data: toLead(r) };
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
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone ?? '',
    company: body.company ?? '',
    source: body.source ?? 'directory',
    status: 'new',
    expertId: body.expertId ?? '',
    notes: body.notes ?? '',
  };

  const res = await fetch(`${BASE}/api/collections/leads/records`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`PocketBase leads POST: ${res.status}`);

  const r: PBLead = await res.json();
  return toLead(r);
}

// --- Events ---

export async function getEvents(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const qs = new URLSearchParams({ page: String(page), perPage: String(limit) });

  const res = await fetch(`${BASE}/api/collections/events/records?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`PocketBase events: ${res.status}`);

  const json: PBListResponse<PBEvent> = await res.json();

  return {
    data: json.items.map(toEvent),
    total: json.totalItems,
    page: json.page,
    limit: json.perPage,
  };
}
