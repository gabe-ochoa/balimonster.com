import { TripPageView, tripMetadata, type TripPage } from '../trip-page';

const page: TripPage = {
  path: '/boat-charter-bali',
  title: 'Boat Charters in Bali',
  description: 'Private boat charters in Bali with Bali Monster Spearfishing. A day offshore for your group, planned around what you want from the water, and booked by WhatsApp.',
  eyebrow: 'BALI MONSTER / BOAT CHARTERS IN BALI',
  heading: ['TAKE YOUR DAY', 'OFFSHORE.'],
  answer: 'Bali Monster Spearfishing offers boat charters in Bali, Indonesia. It is a day on the water for your group, planned around what you want from it, whether that is spearfishing, freediving, or simply time offshore.',
  detail: 'You message us on WhatsApp with your group size and dates, we talk through the options, and we confirm the day together before you book.',
  photo: 'boat-day',
  expect: [
    ['Tell us about the day you want.', 'Spearfishing, freediving, a mix, or a day on the boat. Have something specific in mind? Let us know.'],
    ['A plan around your group.', 'Group size, dates, and what everyone wants from the day shape the trip. We confirm the meeting point with you before the charter.'],
    ['Along the coast and out to the blue.', 'The coastline film on our homepage is from one of our boat days. Conditions on the day decide the route.'],
    ['Good company all the way back.', 'The crew photos on this site are from our own charters. Yours could be next.'],
  ],
  tellUs: [
    ['Your group.', 'How many people, and how many want to get in the water.'],
    ['Your dates.', 'The days you are in Bali and how flexible they are.'],
    ['What you want from the day.', 'Spearfishing, freediving, or simply time offshore. Any mix works, just tell us.'],
    ['What you need.', 'Ask us about pricing, transport, equipment, and inclusions before you book.'],
  ],
  interest: 'a boat charter',
  action: 'Enquire about a charter',
  topic: 'charter',
  serviceType: 'Private boat charter',
};

export const metadata = tripMetadata(page);
export default function BoatCharterBali() { return <TripPageView page={page} track="charters" />; }
