export const site = {
  name: 'Bali Monster Spearfishing',
  url: 'https://balimonster.com',
  phone: '6282236954017',
  phoneDisplay: '+62 822-3695-4017',
  description: 'Spearfishing, freediving, and charters in Bali. Plan your dogtooth tuna spearfishing adventure with Bali Monster Spearfishing on WhatsApp.',
};

export function bookingUrl(interest = 'a trip in Bali') {
  const message = `Hi Bali Monster! I'm interested in ${interest}.\n\nPreferred dates: \nNumber of people: \nExperience level: `;
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}
