export type Domain = 'SEO' | 'Dev Web' | 'UX/UI' | 'IA' | 'Automatisation' | 'Levée de fonds' | 'Dev commercial' | 'Digital nomade' | 'Coaching';

export interface Expert {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  domain: Domain[];
  description: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: 'available' | 'busy';
  location: string;
  links: {
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  source: 'directory' | 'event' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  expertId?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  registered: number;
  status: 'draft' | 'published' | 'happening' | 'done';
  image: string;
  speakers: Expert[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar: string;
  createdAt: Date;
}

export interface Integration {
  id: string;
  provider: 'hubspot' | 'linkedin' | 'calendly' | 'stripe' | 'brevo' | 'mailchimp';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
}
