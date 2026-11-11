/* Image derivatives are pre-generated at 640px and 1280px for static Pages hosting. */
/* eslint-disable @next/next/no-img-element */
import { ScenarioHeader } from '../charter-scenario';
import { BrandFooter } from '../brand-pages';
import { Arrow } from '../components';
import { bookingUrl } from '../site';

export const metadata = { title: 'Bali Monster | Discover Nusa Penida', robots: { index: false, follow: true } };

export default function DiscoverPenida() {
  return <div className="bm"><ScenarioHeader /><main id="main">
    <section className="bm-section scenario-copy"><h1>Discover Nusa Penida</h1><p>A day by sea brings you below Penida’s cliffs and into its bays. The stops below give a sense of the day; the crew chooses the route around weather, waves, currents, and your group.</p><p>Before reaching the southern coast, our crew makes an offering to Nusa Penida and the ocean, honoring the natural world and the island’s place in Balinese culture.</p></section>
    <section className="bm-section scenario-copy"><h2>Donut Rock</h2><p>See the rock’s opening from the boat and stop for a photo. This is a sightseeing stop, without snorkeling.</p></section>
    <section className="bm-story penida-photo"><img src="/media/kelingking-1280.jpg" srcSet="/media/kelingking-640.jpg 640w, /media/kelingking-1280.jpg 1280w" sizes="(max-width: 700px) 100vw, 50vw" width="1280" height="1706" alt="Three divers aboard the boat below Kelingking Beach’s cliffs." loading="lazy" /><div><h2>Kelingking Beach</h2><p>Look up at the steep cliffs and the beach below from the water. Any snorkeling stop depends on the crew’s assessment of conditions that day.</p></div></section>
    <section className="bm-section scenario-copy"><h2>Angel’s Billabong and Broken Beach</h2><p>Along this stretch of coast, see the natural pool at Angel’s Billabong and the rock arch around Broken Beach. We plan these as coastal sightseeing stops. Waves, tides, and access determine how close the boat can approach.</p><p>Dolphins sometimes visit the surrounding bays, but sightings are not guaranteed.</p><p>On our <a className="bm-link" href="/snorkeling#land-sea">land-and-sea itinerary</a>, you switch from the boat to a car for the Angel’s Billabong visit.</p></section>
    <section className="bm-section scenario-copy"><h2>Manta Point</h2><p>This cleaning station draws manta rays and the small fish that clean them. Watch without touching or chasing the mantas, and follow the guide’s instructions. The site can have waves; we use more protected bays when conditions call for it.</p></section>
    <section className="bm-section scenario-copy"><h2>Crystal Bay</h2><p>Look for colorful reef fish and turtles resting or feeding near the seabed. Clear water can make this a rewarding snorkeling stop, though visibility changes with conditions.</p><h2>Gamat Bay</h2><p>Explore shallow water with schooling fish, coral, and rocky habitat when conditions allow.</p><h2>Toya Pakeh and SD Point</h2><p>Toya Pakeh offers reef fish and views across shallow water toward deeper water. SD Point adds soft coral and more reef life to a north-coast route.</p></section>
    <section className="bm-section scenario-copy"><h2>Nusa Lembongan</h2><p>A stop near Lembongan’s mangroves offers a different view of the islands, with soft coral, reef fish, and occasional turtles or schools of barracuda.</p><a className="bm-link" href="/snorkeling">Compare day trips and multi-day stays <Arrow /></a><p><a className="bm-button" href={bookingUrl('a Nusa Penida day trip')}>Plan your Penida day <Arrow /></a></p></section>
  </main><BrandFooter home="/" /></div>;
}
