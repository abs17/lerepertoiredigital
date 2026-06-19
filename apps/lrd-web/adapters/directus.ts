/**
 * Directus adapter — replaces MSW /api/experts, /api/leads, /api/events
 * Requires env vars: DIRECTUS_URL, DIRECTUS_TOKEN
 * Directus REST API: https://docs.directus.io/reference/items/
 */
import type { Expert, Lead, Event } from '@/shared/types';

const BASE = process.env.DIRECTUS_URL ?? '';
const TOKEN = process.env.DIRECTUS_TOKEN ?? '';

const baseHeaders: HeadersInit = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

// Directus wraps responses in { data: T, meta: { total_count, filter_count } }

interface DirectusListResponse<T> {
  data: T[];
  meta: { total_count: number; filter_count: number };
}

interface DirectusSingleResponse<T> {
  data: T;
}

// Field names in Directus match our types (configured to use camelCase or mapped at collection level).
// If your Directus collection uses snake_case, adjust the field mappings here.
type DirectusExpert = Expert;
type DirectusLead = Omit<Lead, 'createdAt' | 'updatedAt'> & {
  date_created: string;
  date_updated: string;
};
type DirectusEvent = Omit<Event, 'date'> & { date: string };

function toLeadFromDirectus(r: DirectusLead): Lead {
  return {
    id: r.id,
    firstName: r.firstName,
    lastName: r.lastName,
    email: r.email,
    phone: r.phone,
    company: r.company,
    source: r.source,
    status: r.status,
    expertId: r.expertId,
    notes: r.notes,
    createdAt: new Date(r.date_created),
    updatedAt: new Date(r.date_updated),
  };
}

function toEventFromDirectus(r: DirectusEvent): Event {
  return { ...r, date: new Date(r.date) };
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

  const qs = new URLSearchParams({
    fields: '*',
    limit: String(limit),
    page: String(page),
    meta: 'total_count,filter_count',
  });

  if (params.search) {
    qs.set('filter[_or][0][name][_icontains]', params.search);
    qs.set('filter[_or][1][title][_icontains]', params.search);
  }
  if (params.domain) {
    qs.set('filter[domain][_contains]', params.domain);
  }

  const res = await fetch(`${BASE}/items/experts?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`Directus experts: ${res.status}`);

  const json: DirectusListResponse<DirectusExpert> = await res.json();
  const total = json.meta.filter_count;

  return { data: json.data, total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getExpertById(id: string): Promise<{ data: Expert }> {
  const res = await fetch(`${BASE}/items/experts/${id}?fields=*`, { headers: baseHeaders });
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw new Error(`Directus experts/${id}: ${res.status}`);

  const json: DirectusSingleResponse<DirectusExpert> = await res.json();
  return { data: json.data };
}

// --- Leads ---

export async function getLeads(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Lead[]; total: number; page: number; limit: number; pages: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const qs = new URLSearchParams({
    fields: '*',
    limit: String(limit),
    page: String(page),
    meta: 'total_count,filter_count',
  });

  const res = await fetch(`${BASE}/items/leads?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`Directus leads: ${res.status}`);

  const json: DirectusListResponse<DirectusLead> = await res.json();
  const total = json.meta.filter_count;

  return { data: json.data.map(toLeadFromDirectus), total, page, limit, pages: Math.ceil(total / limit) };
}

export async function getLeadById(id: string): Promise<{ data: Lead }> {
  const res = await fetch(`${BASE}/items/leads/${id}?fields=*`, { headers: baseHeaders });
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw new Error(`Directus leads/${id}: ${res.status}`);

  const json: DirectusSingleResponse<DirectusLead> = await res.json();
  return { data: toLeadFromDirectus(json.data) };
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
    expertId: body.expertId,
    notes: body.notes ?? '',
  };

  const res = await fetch(`${BASE}/items/leads`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Directus leads POST: ${res.status}`);

  const json: DirectusSingleResponse<DirectusLead> = await res.json();
  return toLeadFromDirectus(json.data);
}

// --- Events ---

export async function getEvents(params: {
  page?: number;
  limit?: number;
}): Promise<{ data: Event[]; total: number; page: number; limit: number }> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  const qs = new URLSearchParams({
    fields: '*',
    limit: String(limit),
    page: String(page),
    meta: 'total_count,filter_count',
  });

  const res = await fetch(`${BASE}/items/events?${qs}`, { headers: baseHeaders });
  if (!res.ok) throw new Error(`Directus events: ${res.status}`);

  const json: DirectusListResponse<DirectusEvent> = await res.json();
  const total = json.meta.filter_count;

  return { data: json.data.map(toEventFromDirectus), total, page, limit };
}
