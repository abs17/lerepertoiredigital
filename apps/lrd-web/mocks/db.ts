import { faker } from '@faker-js/faker';
import type { Expert, Lead, Event } from '@/shared/types';

const DOMAINS = ['SEO', 'Dev Web', 'UX/UI', 'IA', 'Automatisation', 'Levée de fonds', 'Dev commercial', 'Digital nomade'];

function generateExperts(count: number): Expert[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `exp-${i + 1}`,
    name: i === 0 ? 'Nejme Abdelouafi' :
          i === 1 ? 'Azzedine Nebti' :
          i === 2 ? 'Elodie Allegro' :
          i === 3 ? 'Hamid El Haloui' :
          i === 4 ? 'Amina Marie' :
          faker.person.fullName(),
    title: i === 0 ? 'Expert en développement commercial & levée de fonds' :
           i === 1 ? 'Entrepreneur/Coach/Formateur' :
           i === 2 ? 'Développeuse Web' :
           i === 3 ? 'Expert SEO WordPress' :
           i === 4 ? 'Experte IA / Automatisation' :
           faker.company.catchPhrase(),
    bio: i === 0 ? 'Tu as une idée ? J\'ai la méthode pour la développer et la commercialiser' :
         i === 1 ? 'Travaille d\'où tu veux, quand tu veux, même sans diplôme' :
         i === 4 ? 'Formatrice et Consultante IA — Agents IA, Chatbots, Assistants virtuels' :
         faker.lorem.sentence(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    domain: Array.from({ length: Math.floor(Math.random() * 3) + 1 },
      () => DOMAINS[Math.floor(Math.random() * DOMAINS.length)]) as any,
    description: faker.lorem.paragraphs(2),
    rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 100 + 5),
    hourlyRate: Math.floor(Math.random() * 200 + 50),
    availability: Math.random() > 0.3 ? 'available' : 'busy',
    location: faker.location.city() + ', ' + faker.location.countryCode(),
    links: {
      portfolio: `https://example.com/portfolio/${i}`,
      linkedin: `https://linkedin.com/in/expert${i}`,
    },
  }));
}

function generateEvents(count: number): Event[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `evt-${i + 1}`,
    title: i === 0 ? 'Discovery Event' : `Event ${i + 1}`,
    description: faker.lorem.paragraph(),
    date: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
    location: i === 0 ? 'Paris, France' : faker.location.city(),
    capacity: 200,
    registered: Math.floor(Math.random() * 150 + 20),
    status: 'published' as const,
    image: `https://picsum.photos/400/300?random=${i}`,
    speakers: [],
  }));
}

export const mockDB = {
  experts: generateExperts(50),
  leads: [] as Lead[],
  events: generateEvents(5),
  users: [
    {
      id: 'user-1',
      email: 'demo@example.com',
      name: 'John Doe',
      role: 'user' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      createdAt: new Date(),
    },
  ],
};
