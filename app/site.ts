export const site = {
  name: 'Bali Monster Spearfishing',
  url: 'https://balimonster.com',
  phone: '6282236954017',
  phoneDisplay: '+62 822-3695-4017',
  description: 'Spearfishing, freediving, and charters in Bali. Plan your dogtooth tuna spearfishing adventure with Bali Monster Spearfishing on WhatsApp.',
  // Where the business operates. Used in structured data and the agent summary.
  areaServed: 'Bali, Indonesia',
  // Public profiles for the same business (Google Business Profile, TripAdvisor, Instagram, YouTube).
  // Add the full URLs once the profiles exist; they are published as schema.org sameAs links.
  profiles: [] as string[],
  socialImage: { path: '/media/two-catches-1280.jpg', width: 1280, height: 854, alt: 'Two spearfishers aboard a boat with their catches.' },
};

// E.164 form used by schema.org telephone fields.
export const phoneE164 = `+${site.phone}`;

export function bookingUrl(interest = 'a trip in Bali') {
  const message = `Hi Bali Monster! I'm interested in ${interest}.\n\nPreferred dates: \nNumber of people: \nExperience level: `;
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}
