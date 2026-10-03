/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
import type { Metadata } from 'next';
import { Arrow, Header, Footer, Photo, Film, BrandIllustration, TrackCrossLink } from '../components';
import { faqsFor } from '../faqs';
import { bookingUrl, site } from '../site';
import { JsonLd, faqSchema } from '../structured-data';
import { rememberTrackScript, tracks } from '../tracks';

// Charter trips. Nothing on this side mentions the hunt: a snorkeler should read it and feel it was written for them.
const trips = [
  { number: '01', title: 'Snorkeling', tag: 'THE CLEAR WATER', description: 'Warm water, reef, and time to float. A boat day built around snorkeling stops, with the crew choosing the spots for the conditions.', action: 'Plan a snorkeling day', interest: 'a snorkeling boat trip' },
  { number: '02', title: 'Sunset cruise', tag: 'THE GOLDEN HOUR', description: 'Head out late and come home under the sunset. An easy evening on the water for couples, families, and friends.', action: 'Plan a sunset cruise', interest: 'a sunset cruise' },
  { number: '03', title: 'Island camping', tag: 'THE NIGHT OUT', description: 'Boat out, camp on the shore, and wake up to the sea. Tell us your group and dates and we will talk through what an overnight looks like.', action: 'Ask about island camping', interest: 'an island camping trip' },
  { number: '04', title: 'Sportfishing', tag: 'THE LINE', description: 'A day on the rod with a crew that knows the water. Suited to beginners and keen anglers alike.', action: 'Plan a sportfishing day', interest: 'a sportfishing charter' },
  { number: '05', title: 'Island transfers', tag: 'THE CROSSING', description: 'A private boat between Bali and the nearby islands, on your schedule, with room for your group and your bags.', action: 'Ask about a transfer', interest: 'an island transfer' },
  { number: '06', title: 'Your own day', tag: 'THE MIX', description: 'A bit of everything, or something we have not listed. Tell us what you have in mind and we will plan it with you.', action: 'Tell us your idea', interest: 'a boat charter' },
];
const faqs = faqsFor('charter');
const track = tracks.charters;
const title = 'Bali Monster Charters | Snorkeling, Sunset Cruises & Boat Days in Bali';
const description = 'Private boat charters in Bali with Bali Monster. Snorkeling, sunset cruises, island camping, sportfishing, and island transfers, planned with you on WhatsApp.';
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}${track.path}` },
  openGraph: { type: 'website', url: `${site.url}${track.path}`, title, description, images: [{ url: `${site.url}/media/coastal-run-1280.jpg`, width: 1280, height: 720, alt: 'A boat crosses blue water beside a coastal rock arch.' }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${site.url}/media/coastal-run-1280.jpg`] },
};
export default function ChartersHome() {
  return <>
    <script dangerouslySetInnerHTML={{ __html: rememberTrackScript(track.id) }} />
    <Header track={track.id} />
    <main id="main">
      <section className="hero hero-charters" aria-labelledby="hero-title">
        <Photo id="coastal-run" className="hero-photo" priority sizes="100vw" /><div className="hero-shade" />
        <div className="container hero-inner"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> BALI, INDONESIA · PRIVATE BOAT CHARTERS</p><h1 id="hero-title">YOUR DAY<br /><span>ON THE WATER.</span></h1><p className="hero-description">Snorkeling. Sunset cruises. Island camping. Sportfishing. Island transfers.<br />A boat and crew for the day, planned your way with Bali Monster Charters.</p><a className="button button-lime" href={bookingUrl(track.interest)}>Plan your boat day on WhatsApp <Arrow /></a><p className="button-note">Real boats. Real crew. No forms, just a conversation.</p></div><div className="hero-side-note" aria-hidden="true">SLOW DOWN. LOOK AROUND.</div><div className="hero-bottom"><span>ONE ISLAND. A WHOLE COASTLINE TO EXPLORE.</span><a href="#experiences">See the trips <span aria-hidden="true">↓</span></a></div></div>
      </section>
      <div className="activity-strip" aria-hidden="true"><div className="container"><span>SNORKELING</span><i>✳︎</i><span>SUNSETS</span><i>✳︎</i><span>CAMPING</span><i>✳︎</i><span>SPORTFISHING</span><i>✳︎</i><span>TRANSFERS</span></div></div>
      <section className="experiences section-light" id="experiences" aria-labelledby="experiences-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">01 / PICK YOUR DAY</p><h2 id="experiences-title">EASY DAYS.<br />BIG VIEWS.</h2></div><p>For the reef. For the sunset.<br />For a night under the stars.<br />Tell us the day you want and we&apos;ll plan it.</p></div><div className="experience-grid experience-grid-six">{trips.map(trip => <article className="experience" key={trip.number}><div className="experience-top"><span>{trip.number}</span><span>{trip.tag}</span></div><h3>{trip.title}</h3><p>{trip.description}</p><a href={bookingUrl(trip.interest)}>{trip.action}<Arrow /></a></article>)}</div><p className="experience-footnote"><a className="text-link text-link-ink" href="/boat-charter-bali">How a charter comes together <Arrow /></a></p></div></section>
      <section className="hunt" id="the-water" aria-labelledby="water-title"><div className="container hunt-grid"><div className="hunt-image"><Photo id="at-the-surface" /><div className="image-caption"><span>A MOMENT FROM THE WATER.</span><Arrow /></div></div><div className="hunt-copy"><p className="eyebrow">02 / THIS IS WHAT WE COME FOR</p><h2 id="water-title">WARM SEA.<br />CLEAR<br /><span>BLUE.</span></h2><p className="hunt-lead">Float, look down, and let the day go slow.</p><p>These are moments from our boat days: the coastline from the water, the quiet between stops, and the ride home under the sunset. Come with a group and an idea. Tell us your dates and what you want from the day.</p><p className="conditions">Every trip starts with a conversation about your group and the conditions. The ocean sets the route on the day.</p><a className="text-link" href={bookingUrl('a snorkeling boat trip')}>Let&apos;s talk snorkeling <Arrow /></a></div></div></section>
      <section className="trip-preview section-light" aria-labelledby="trip-preview-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">FROM OUR BOAT DAYS</p><h2 id="trip-preview-title">THE SCENIC<br />ROUTE.</h2></div><div className="preview-intro"><p>The coastline from the water, filmed on one of our charters.<br />Watch the clip, then picture your own day out here.</p><a className="text-link" href="/gallery#films">See the photos &amp; films <Arrow /></a></div></div><div className="home-film home-film-charters"><Film id="coastal-run" /><div><p className="eyebrow">A LITTLE FURTHER OUT</p><h2>ALONG<br />THE COAST.</h2><p>Cliffs, arches, and open blue. Conditions on the day decide the route, and the crew knows where the water is best.</p><a className="text-link" href={bookingUrl(track.interest)}>Plan a boat day <Arrow /></a></div></div></div></section>
      <section className="booking section-light" id="plan-your-trip" aria-labelledby="booking-title"><div className="container booking-grid"><div><p className="eyebrow">03 / MAKE IT HAPPEN</p><h2 id="booking-title">GOOD DAYS<br />START HERE.</h2><p>No long forms. Just a conversation.</p></div><ol className="booking-steps"><li><span>01</span><div><h3>Tell us the day you want.</h3><p>Snorkeling, a sunset cruise, a night of camping, a day on the rod, or a crossing to the islands.</p></div></li><li><span>02</span><div><h3>Share a few details.</h3><p>Your dates, group size, and how many want to get in the water help us plan the right boat and route.</p></div></li><li><span>03</span><div><h3>Plan it together.</h3><p>We&apos;ll confirm availability, pricing, the meeting point, and what to bring on WhatsApp.</p></div></li></ol></div></section>
      <section className="faq section-light" aria-labelledby="faq-title"><JsonLd data={faqSchema(faqs)} /><div className="container faq-grid"><div><p className="eyebrow">BEFORE YOU HEAD OUT</p><h2 id="faq-title">A FEW<br />GOOD QUESTIONS.</h2><p className="trip-faq-more"><a className="text-link text-link-ink" href="/faq">All questions <Arrow /></a></p></div><div className="faq-list">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="final-cta" aria-labelledby="cta-title"><div className="container"><p className="eyebrow">BALI IS CALLING.</p><h2 id="cta-title">SEE YOU<br />ON THE WATER.</h2><a className="button button-dark" href={bookingUrl(track.interest)}>Chat with us on WhatsApp <Arrow /></a><a className="contact-number" href={bookingUrl(track.interest)}>{site.phoneDisplay}</a></div><BrandIllustration /></section>
      <TrackCrossLink track={track.id} />
    </main>
    <Footer track={track.id} />
  </>;
}
