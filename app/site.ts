export const site = {
  name: 'Bali Monster',
  url: 'https://balimonster.com',
  phone: '15127679350',
  phoneDisplay: '+1 512 767 9350',
  description: 'Discover Bali with Bali Monster. Snorkeling, sunsets, camping, sportfishing, island transfers, and spearfishing. Choose your ocean adventure.',
};

export function bookingUrl(interest = 'a trip in Bali') {
  const message = `Hi Bali Monster! I'm interested in ${interest}.\n\nPreferred dates: \nNumber of people: \nExperience level: `;
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}
