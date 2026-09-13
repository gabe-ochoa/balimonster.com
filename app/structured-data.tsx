import type { Faq } from './faqs';
import { phoneE164, site } from './site';

// schema.org JSON-LD. Rendered into the static HTML so crawlers and assistants read it without JavaScript.
export const businessId = `${site.url}/#business`;

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation'],
    '@id': businessId,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: phoneE164,
    image: `${site.url}${site.socialImage.path}`,
    logo: `${site.url}/brand/icon-192.png`,
    areaServed: { '@type': 'Place', name: site.areaServed },
    address: { '@type': 'PostalAddress', addressRegion: 'Bali', addressCountry: 'ID' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'reservations', telephone: phoneE164, url: `https://wa.me/${site.phone}`, availableLanguage: 'en' },
    knowsAbout: ['Spearfishing', 'Freediving', 'Boat charters', 'Dogtooth tuna'],
    ...(site.profiles.length ? { sameAs: site.profiles } : {}),
  };
}

export function serviceSchema({ path, name, description, serviceType }: { path: string; name: string; description: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${path}#service`,
    name,
    description,
    serviceType,
    url: `${site.url}${path}`,
    provider: { '@id': businessId },
    areaServed: { '@type': 'Place', name: site.areaServed },
    potentialAction: { '@type': 'CommunicateAction', name: 'Enquire on WhatsApp', target: `https://wa.me/${site.phone}` },
  };
}

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };
}

export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so a value can never close the script element.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll('<', '\\u003c') }} />;
}
