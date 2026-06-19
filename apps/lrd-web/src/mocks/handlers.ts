import { http, HttpResponse } from 'msw';
import { mockDB } from './db';
import type { Lead } from '@/shared/types';

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({
      user: {
        id: 'user-1',
        email: body.email,
        name: 'John Doe',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      },
      token: 'fake-jwt-token-' + Date.now(),
    }, { status: 200 });
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({
      user: {
        id: 'user-' + Date.now(),
        email: body.email,
        name: body.name,
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + body.email,
      },
      token: 'fake-jwt-token-' + Date.now(),
    }, { status: 201 });
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // Experts endpoints
  http.get('/api/experts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const domain = url.searchParams.get('domain') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');

    let results = [...mockDB.experts];

    if (search) {
      results = results.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (domain) {
      results = results.filter(e => e.domain.includes(domain as any));
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = results.slice(start, end);

    return HttpResponse.json({
      data: paginated,
      total: results.length,
      page,
      limit,
      pages: Math.ceil(results.length / limit),
    });
  }),

  http.get('/api/experts/:id', ({ params }) => {
    const expert = mockDB.experts.find(e => e.id === params.id);
    if (!expert) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: expert });
  }),

  // Leads endpoints
  http.get('/api/leads', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = mockDB.leads.slice(start, end);

    return HttpResponse.json({
      data: paginated,
      total: mockDB.leads.length,
      page,
      limit,
      pages: Math.ceil(mockDB.leads.length / limit),
    });
  }),

  http.post('/api/leads', async ({ request }) => {
    const body = await request.json() as any;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      source: body.source || 'directory',
      status: 'new',
      expertId: body.expertId,
      notes: body.notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDB.leads.push(newLead);
    return HttpResponse.json(newLead, { status: 201 });
  }),

  http.get('/api/leads/:id', ({ params }) => {
    const lead = mockDB.leads.find(l => l.id === params.id);
    if (!lead) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: lead });
  }),

  // Events endpoints
  http.get('/api/events', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = mockDB.events.slice(start, end);

    return HttpResponse.json({
      data: paginated,
      total: mockDB.events.length,
      page,
      limit,
    });
  }),

  // Analytics endpoints
  http.get('/api/analytics/funnel', () => {
    return HttpResponse.json({
      visitors: 5000,
      browsed: 2000,
      contacted: 500,
      converted: 60,
    });
  }),

  http.get('/api/analytics/kpi', () => {
    return HttpResponse.json({
      contacts: 245,
      contactsTrend: 12,
      leads: 48,
      leadsTrend: 8,
      events: 12,
      eventsTrend: 25,
      revenue: 15420,
      revenueTrend: 18,
    });
  }),

  http.get('/api/analytics/domain', () => {
    return HttpResponse.json({
      data: [
        { domain: 'SEO', count: 450, color: '#A16207' },
        { domain: 'Dev Web', count: 380, color: '#1C1917' },
        { domain: 'UX/UI', count: 320, color: '#44403C' },
        { domain: 'IA', count: 290, color: '#A16207' },
      ],
    });
  }),
];
