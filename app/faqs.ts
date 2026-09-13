// Questions and answers shared by the homepage, the FAQ page, and the activity pages.
// Answers only state what the business has confirmed. Pricing, inclusions, meeting points,
// and certifications are deliberately answered with "ask us on WhatsApp" until the owner supplies them.
export type Faq = { question: string; answer: string; topics: Array<'booking' | 'spearfishing' | 'freediving' | 'charter'> };

export const faqs: Faq[] = [
  { question: 'How do I book a trip?', answer: 'Tap any WhatsApp button to start a chat with Bali Monster Spearfishing. Send your preferred activity, dates, group size, and experience. We will discuss the details with you before you book.', topics: ['booking', 'spearfishing', 'freediving', 'charter'] },
  { question: 'Do I need previous experience?', answer: 'Tell us about your swimming, freediving, and spearfishing experience when you enquire. We will discuss trip suitability with you before confirming.', topics: ['booking', 'spearfishing', 'freediving'] },
  { question: 'What does a trip cost and include?', answer: 'Ask us on WhatsApp for pricing and inclusions for your chosen trip. Confirm equipment, transport, meeting points, and anything you need to bring before booking.', topics: ['booking', 'spearfishing', 'freediving', 'charter'] },
  { question: 'Can I plan a trip around dogtooth tuna?', answer: "Yes, tell us you're interested in hunting dogtooth tuna. We will discuss your experience and the trip options with you. Conditions and encounters vary, and catches are never guaranteed.", topics: ['spearfishing'] },
  { question: 'Where in Bali do the trips run?', answer: 'Bali Monster Spearfishing is based in Bali, Indonesia. The launch point and dive area depend on the trip, the season, and the conditions on the day. We confirm the meeting point with you on WhatsApp when we plan your trip.', topics: ['booking', 'spearfishing', 'freediving', 'charter'] },
  { question: 'Is spearfishing allowed in Bali?', answer: 'Recreational spearfishing is practised in Bali, but rules differ by area, and marine protected areas around Bali have zones where fishing is not allowed. We plan trips within those rules and will talk you through what applies to your trip.', topics: ['spearfishing'] },
  { question: 'Can beginners join a freediving trip?', answer: 'Tell us your comfort in the water and any freediving you have done. We will discuss whether a freediving trip suits you and what to expect before anything is confirmed.', topics: ['freediving'] },
  { question: 'Who is a boat charter for?', answer: 'Groups, families, and friends who want a day on the water around Bali. Tell us your group size, your dates, and what you want from the day, and we will talk through the options.', topics: ['charter'] },
  { question: 'Are catches guaranteed?', answer: 'No. Conditions and encounters vary on every trip. We plan around the season and the day, but the ocean decides.', topics: ['spearfishing'] },
  { question: 'How quickly do you reply on WhatsApp?', answer: 'We reply as soon as we are back in signal. If we are out on the water, expect an answer later the same day.', topics: ['booking', 'spearfishing', 'freediving', 'charter'] },
];

export function faqsFor(topic: Faq['topics'][number]) {
  return faqs.filter(faq => faq.topics.includes(topic));
}
