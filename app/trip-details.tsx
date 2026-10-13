import { Arrow, Photo } from './components';
import { bookingUrl } from './site';

export function SafetyNote() {
  return <section className="bm-safety" aria-labelledby="safety-heading"><p className="bm-kicker">YOUR COMFORT COMES FIRST</p><h2 id="safety-heading">A good day is<br />a safe day.</h2><p>We cancel trips when conditions are dangerous. Safety comes before the itinerary, every time.</p><p>From first-time snorkelers to advanced freedivers, we tailor the route and pace to your group’s experience and comfort. Our boat, Putri Sri Ayuni (PSA), carries life jackets, safety equipment, a medical kit, and an EPIRB emergency beacon.</p></section>;
}

export function IslandTrips() {
  return <section className="bm-section bm-destinations"><div className="bm-section-heading"><div><p className="bm-kicker">THREE ISLANDS. YOUR KIND OF DAY.</p><h2>Meet the<br />Nusa islands.</h2></div><p>Day trips and snorkeling around Nusa Penida,<br />Nusa Lembongan, and Nusa Ceningan.<br />A route shaped around you and the sea.</p></div><div className="bm-destination-grid"><article><span>01 / NUSA PENIDA</span><h3>Beyond the crowds.</h3><p>Visit the famous manta cleaning station at Manta Point, with timing planned to avoid the busiest tour hours. Wildlife sightings and access depend on conditions.</p></article><article><span>02 / NUSA LEMBONGAN</span><h3>Time in the blue.</h3><p>Make a day of snorkeling, island coastlines, and time on the boat. We choose stops around the conditions and your group’s comfort.</p></article><article><span>03 / NUSA CENINGAN</span><h3>A little further out.</h3><p>Explore the smaller island’s coastline as part of your Nusa island day. Tell us what you love and we’ll plan the details together.</p></article></div></section>;
}

export function SnorkelingStory() {
  return <section className="bm-story bm-snorkeling"><Photo id="at-the-surface" /><div><p className="bm-kicker">LOCAL KNOWLEDGE. A DIFFERENT VIEW.</p><h2>Follow the fish.<br />Find your calm.</h2><p>Putu’s years as a commercial spearfisherman have led him to underwater structures alive with fish. Explore these places at your own pace, with snorkeling and freediving for beginners and experienced guests.</p><p>Alongside the Nusa islands, we offer snorkeling trips to Padang Bai and Tulamben.</p><a className="bm-button" href={bookingUrl('snorkeling around the Nusa islands')}>Plan a snorkeling trip <Arrow /></a></div></section>;
}

export function BeachDays() {
  return <section className="bm-section bm-beach-days"><p className="bm-kicker">A TABLE BY THE WATER</p><h2>Stay for lunch.</h2><p>Reach beaches that are hard to get to by land, where there’s room to slow down. We prepare lunch and drinks, with fresh sashimi or a beach grill when a suitable catch is available.</p><p>Our roots are in freediving and spearfishing. During a rest stop, a guide may try for a fish for lunch while the crew looks after the group. Let us know your food preferences when we plan your day.</p><a className="bm-link" href={bookingUrl('a boat day with a beach lunch')}>Make it your boat day <Arrow /></a></section>;
}
