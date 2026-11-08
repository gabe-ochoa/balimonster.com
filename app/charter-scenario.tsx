import { BrandFooter, CharterCaptain, MobileBooking } from './brand-pages';
import { Photo, Arrow } from './components';
import LoopVideo from './loop-video';
import { bookingUrl } from './site';
import { SafetyNote } from './trip-details';
import WeekEnquiry from './week-enquiry';

export function ScenarioHeader() {
  return <><a className="skip-link" href="#main">Skip to content</a><header className="bm-header scenario-header"><a className="bm-wordmark" href="/review/charter-home">BALI MONSTER<span>BALI, INDONESIA</span></a><nav aria-label="Main navigation"><a href="/review/charter-home">Boat charters</a><a href="/snorkeling">Snorkeling</a><a href="/review/charter-home/spearfishing">Spearfishing</a></nav></header></>;
}
export function CharterHome() {
  return <div className="bm"><ScenarioHeader /><main id="main">
    <section className="bm-hero"><LoopVideo id="penida-hero" label="Nusa Penida by sea" hero /><div className="bm-hero-shade" /><div className="bm-hero-copy"><h1>Private boat<br />charters in Bali</h1><p>Nusa Penida, the Gilis, and islands beyond. Snorkel, explore, watch the sunset, or plan a spearfishing trip with our local crew.</p><a className="bm-button" href="#week-heading">Plan your dates <Arrow /></a></div></section><MobileBooking />
    <section className="bm-section scenario-routes"><div className="bm-choices"><a className="bm-choice" href="/snorkeling"><Photo id="at-the-surface" /><div><h2>Snorkeling <Arrow /></h2><p>Day trips and multi-day stays around Nusa Penida, Lembongan, and Ceningan. Families welcome.</p></div></a><a className="bm-choice" href="/review/charter-home/spearfishing"><Photo id="below-the-surface" /><div><h2>Spearfishing <Arrow /></h2><p>Guided reef and blue-water trips, plus local beginner classes.</p></div></a></div></section>
    <section className="bm-story"><Photo id="coastal-run" /><div><h2>Choose your route</h2><p>Take a private day around the Nusa islands, a sunset trip along Bali’s coast, or a transfer to the Gilis.</p><p>Longer charters can combine island hopping toward Komodo, or surf, snorkeling, and spearfishing around G-Land and Alas Purwo. Routes, access, and conditions are confirmed before booking.</p><a className="bm-link" href={bookingUrl('a custom island charter')}>Discuss a longer trip <Arrow /></a></div></section>
    <CharterCaptain /><WeekEnquiry /><SafetyNote />
  </main><BrandFooter home="/review/charter-home" /></div>;
}
export function SnorkelingPage() {
  return <div className="bm"><ScenarioHeader /><main id="main">
    <section className="bm-hero"><LoopVideo id="manta-snorkeling-trimmed" label="Snorkeling with manta rays" hero /><div className="bm-hero-shade" /><div className="bm-hero-copy"><h1>Snorkeling<br />Nusa Penida</h1><p>Private day trips and multi-day exploring with a boat and local guides.</p><a className="bm-button" href={bookingUrl('a snorkeling trip')}>Plan a snorkeling trip <Arrow /></a></div></section><MobileBooking activity="a snorkeling trip" />
    <section className="bm-section"><h2>Nusa Penida multi-day trips</h2><div className="scenario-copy"><p>Explore Nusa Penida by sea over several days. Stay at a friend’s resort with our help, or book your own accommodation and join our boat and guides each day.</p><p>The calmer north coast has deep drop-offs. Around Lembongan and Ceningan, explore mangrove forests and soft coral reefs where turtles feed. On Penida’s exposed south coast, conditions may allow encounters with giant manta rays, mola mola sunfish, pelagic schools, and occasionally whales. Wildlife sightings are never guaranteed.</p></div></section>
    <section className="bm-story"><LoopVideo id="snorkeling-trevally" label="A school of bigeye trevally underwater" /><div><h2>Bring the family</h2><p>Our guides help families with different levels of ocean comfort. Tell us about young children and less confident swimmers before booking so we can arrange extra guides and suitable stops.</p><p>Choose a single day or several days on the water. Routes follow the weather, sea conditions, and your group’s needs.</p><a className="bm-button" href={bookingUrl('a family snorkeling trip')}>Discuss your group <Arrow /></a></div></section>
    <SafetyNote /><WeekEnquiry interest="a snorkeling trip" />
  </main><BrandFooter home="/review/charter-home" /></div>;
}
export function LearnPage() {
  return <div className="bm"><ScenarioHeader /><main id="main">
    <section className="bm-story learn-intro"><Photo id="jukung-9197" /><div><h1>Learn to spearfish<br />in Indonesia</h1><p>Beginner classes aboard a local jukung, departing from Mertasari Beach to explore the shallow reefs around Nusa Dua and Serangan.</p><a className="bm-button" href={bookingUrl('a beginner spearfishing class')}>Ask about a class <Arrow /></a></div></section>
    <section className="bm-section learn-packages"><h2>One day or three</h2><div className="bm-activities"><article><h3>One-day class</h3><p>Start locally with a guide, a safety briefing, and time learning in shallow water. The day follows your experience and the conditions.</p></article><article><h3>Three-day package</h3><p>Two days learning locally, followed by a mixed snorkeling and spearfishing day at Nusa Penida. All meals are included, with grilling at our shop in the Sanur/Denpasar area each night.</p></article></div></section>
    <section className="bm-section scenario-copy"><h2>Safety comes first</h2><p>Your guide covers equipment handling, buddy procedures, and the day’s conditions before entering the water. Never dive alone. Stay within your training and comfort, and follow the guide’s briefing throughout the trip.</p><p>Tell us about your swimming experience when you enquire so we can plan the right support.</p><a className="bm-link" href="/review/charter-home/spearfishing">See all spearfishing trips <Arrow /></a></section>
  </main><BrandFooter home="/review/charter-home" /></div>;
}
