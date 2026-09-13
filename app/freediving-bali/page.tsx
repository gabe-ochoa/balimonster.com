import { TripPageView, tripMetadata, type TripPage } from '../trip-page';

const page: TripPage = {
  path: '/freediving-bali',
  title: 'Freediving in Bali',
  description: 'Freediving trips in Bali with Bali Monster Spearfishing. Time in the blue on one breath, planned around your comfort in the water, and booked by WhatsApp.',
  eyebrow: 'BALI MONSTER / FREEDIVING IN BALI',
  heading: ['ONE BREATH.', 'A DIFFERENT WORLD.'],
  answer: 'Bali Monster Spearfishing runs freediving trips in Bali, Indonesia. It is time in the blue on one breath, without a speargun, planned around your comfort in the water and the conditions on the day.',
  detail: 'You message us on WhatsApp with your experience and dates, we talk through what to expect, and we confirm the trip together before you book.',
  photo: 'at-the-surface',
  expect: [
    ['A conversation first.', 'Tell us how comfortable you are in open water and any freediving you have done. We discuss whether a trip suits you before confirming.'],
    ['A plan around the conditions.', 'Where we go and when depends on the season and the sea on the day. We confirm the meeting point with you before the trip.'],
    ['Time in the blue.', 'Open water, one breath at a time, with the boat close by. The stillness is the point.'],
    ['The way home.', 'Salt on your skin and blue in every direction. The photos on this site are from days like these.'],
  ],
  tellUs: [
    ['Your comfort in the water.', 'How you feel in open ocean, how far you swim, and whether you have freedived before.'],
    ['Your dates.', 'The days you are in Bali and how flexible they are.'],
    ['Your group.', 'How many people are diving and whether anyone is joining just for the boat.'],
    ['What you need.', 'Ask us about equipment, transport, and pricing before you book.'],
  ],
  interest: 'freediving',
  action: 'Plan a freediving trip',
  topic: 'freediving',
  serviceType: 'Guided freediving trip',
};

export const metadata = tripMetadata(page);
export default function FreedivingBali() { return <TripPageView page={page} />; }
