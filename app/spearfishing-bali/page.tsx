import { TripPageView, tripMetadata, type TripPage } from '../trip-page';

const page: TripPage = {
  path: '/spearfishing-bali',
  title: 'Spearfishing in Bali',
  description: 'Guided spearfishing trips in Bali with Bali Monster Spearfishing. Hunt dogtooth tuna in blue water, plan around your experience and the conditions, and book by WhatsApp.',
  eyebrow: 'BALI MONSTER / SPEARFISHING IN BALI',
  heading: ['THE HUNT', 'STARTS HERE.'],
  answer: 'Bali Monster Spearfishing runs guided spearfishing trips in Bali, Indonesia. Dogtooth tuna is the hunt we are known for, and every trip is planned around your experience, your dates, and the conditions on the day.',
  detail: 'There is no booking form. You message us on WhatsApp, we talk through the trip, and we confirm the details together before anything is booked.',
  photo: 'blue-water-catch',
  expect: [
    ['A conversation first.', 'Tell us your spearfishing and freediving experience and what you want to hunt. We are honest about whether a trip suits you.'],
    ['A plan around the conditions.', 'Launch point, dive area, and timing depend on the season and the sea on the day. We confirm them with you before the trip.'],
    ['Blue water and a real hunt.', 'Dogtooth tuna are the target that brings us back. Conditions and encounters vary, and catches are never guaranteed.'],
    ['Back to the boat with a story.', 'The photos and films on this site are from our own trips. Yours could be next.'],
  ],
  tellUs: [
    ['Your experience.', 'How long you have been spearfishing, the depths you are comfortable at, and any freediving training.'],
    ['Your dates.', 'The days you are in Bali and how flexible they are. Flexibility helps us pick the best conditions.'],
    ['Your group.', 'How many people are diving and how many are coming along for the boat day.'],
    ['Your gear.', 'What you are bringing and what you need. Ask us about equipment, transport, and pricing before you book.'],
  ],
  interest: 'spearfishing for dogtooth tuna',
  action: 'Plan a spearfishing trip',
  topic: 'spearfishing',
  serviceType: 'Guided spearfishing trip',
};

export const metadata = tripMetadata(page);
export default function SpearfishingBali() { return <TripPageView page={page} />; }
