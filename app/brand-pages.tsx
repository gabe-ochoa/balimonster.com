import BusinessDetails from './business-details';
/* eslint-disable @next/next/no-html-link-for-pages */
import { Photo, Arrow } from './components';
import { bookingUrl } from './site';
import LoopVideo from './loop-video';
import ActivityPicker from './activity-picker';
import { IslandTrips, SnorkelingStory, BeachDays, SafetyNote, IslandStays } from './trip-details';

export function BrandHeader({ activity }: { activity?: string }) {
  return <><a className="skip-link" href="#main">Skip to content</a><header className="bm-header" id="top"><a className="bm-wordmark" href="/" aria-label="Bali Monster home">BALI MONSTER<span>{activity || 'BOAT CHARTERS & SPEARFISHING'}</span></a><nav aria-label="Main navigation"><a href="/charters">Boat charters</a><a href="/spearfishing">Spearfishing</a><a className="bm-nav-cta" href={bookingUrl(activity || 'a trip in Bali')}>Plan a trip <Arrow /></a></nav></header></>;
}
export function MobileBooking({ activity = 'a boat charter' }: { activity?: string }) {
  return <div className="bm-mobile-booking"><a className="bm-button" href={bookingUrl(activity)}>Book on WhatsApp <Arrow /></a></div>;
}
export function BrandFooter() {
  return <footer className="bm-footer"><a className="bm-wordmark" href="/">BALI MONSTER<span>BALI, INDONESIA</span></a><a href="/">All activities ↗</a><BusinessDetails /></footer>;
}
const activities = [
  {id:'snorkeling',title:'Snorkeling',subtitle:'Penida. Lembongan. Ceningan.',detail:'Explore the Nusa islands, including Manta Point when conditions allow. We also offer snorkeling at Padang Bai and Tulamben, with routes for beginners and advanced guests.'},
  {id:'sunsets',title:'Sunsets',subtitle:'Nusa Dua and Waterblow.',detail:'Watch the last light at Nusa Dua and Waterblow, or take in views of Bali from the boat. We plan the route around the evening’s conditions.'},
  {id:'sportfishing',title:'Sportfishing',subtitle:'',detail:'Plan a fishing day from the boat. Discuss your experience, equipment, and the kind of trip you have in mind.'},
  {id:'island-transfer',title:'Island transfer',subtitle:'Gili Islands and other routes by arrangement.',detail:'Transfers to the Gili Islands and longer island charters. Tell us which island you have in mind so we can confirm the route, conditions, and arrangements.'},
];
export function ActivityCards({ detail = false }: { detail?: boolean }) {
  return <div className={`bm-activities${detail ? ' bm-activity-details' : ''}`}>{activities.map((a)=><article key={a.id} id={detail ? a.id : undefined}><h3>{a.title}</h3>{(detail || a.subtitle) && <p>{detail ? a.detail : a.subtitle}</p>}<a href={detail ? bookingUrl(a.title.toLowerCase()) : `/charters#${a.id}`}>{detail ? `Ask about ${a.title.toLowerCase()}` : 'Explore trip'} <Arrow /></a></article>)}</div>;
}
function ChoiceCards() {
  return <div className="bm-choices" id="experiences"><a className="bm-choice" href="/charters"><Photo id="coastal-run" /><div><h2>Boat charters <Arrow /></h2><p>Snorkeling. Sunsets. Island days.<br />Sportfishing. Island transfers.</p><span className="bm-link">Find your boat day →</span></div></a><a className="bm-choice" href="/spearfishing"><Photo id="below-the-surface" /><div><h2>Spearfishing <Arrow /></h2><span className="bm-link">Explore spearfishing →</span></div></a></div>;
}
export function Landing({ variant }: { variant: 'popup' | 'split' | 'activity' }) {
 return <div className={`bm bm-${variant}`}><BrandHeader /><main id="main">
  {variant === 'split' ? <><section className="bm-split-intro"><h1>Boat charters and spearfishing</h1></section><ChoiceCards /></> :
  <section className="bm-hero"><LoopVideo id="penida-hero" label="Nusa Penida by sea" hero /><div className="bm-hero-shade" /><div className="bm-hero-copy"><h1>{variant === 'activity' ? <>NUSA PENIDA.<br /><em>by sea.</em></> : <>Boat charters in Bali</>}</h1><p>Snorkeling, sunsets, sportfishing, and island transfers around Bali and the Nusa islands.</p><div className="bm-hero-actions">{variant === 'popup' ? <ActivityPicker /> : <><a className="bm-button" href="/charters">Find your boat day <Arrow /></a><a className="bm-quiet-link" href="/spearfishing">Here for spearfishing? ↗</a></>}</div></div><div className="bm-hero-bottom"><a href="#experiences">Explore ↓</a></div></section>}
  <MobileBooking />
  {variant === 'popup' && <section className="bm-section"><div className="bm-section-heading"><h2>Choose an activity</h2></div><ChoiceCards /></section>}
  <section className="bm-section" id={variant === 'activity' ? 'experiences' : 'boat-days'}><div className="bm-section-heading"><div><h2>Boat charters</h2></div></div><ActivityCards /></section>
  <IslandTrips /><SnorkelingStory /><BeachDays /><IslandStays /><SafetyNote />
  <section className="bm-story"><Photo id="at-the-surface" /><div><h2>Plan your trip</h2><p>Send your dates, group size, and preferred activity to confirm availability and pricing.</p><a className="bm-button" href={bookingUrl('a boat charter')}>Let’s plan your day <Arrow /></a></div></section>
  <section className="bm-end"><h2>Spearfishing</h2><a className="bm-link" href="/spearfishing">Explore spearfishing <Arrow /></a></section>
 </main><BrandFooter /></div>;
}
function CharterFilm() {
  return <div className="bm-section bm-charter-film"><LoopVideo id="manta-snorkeling" label="Snorkeling with manta rays" /></div>;
}
function CharterCaptain() {
  return <section className="bm-story bm-charter-captain" aria-labelledby="charter-captain-title">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/media/putu-smile-1280.jpg" srcSet="/media/putu-smile-640.jpg 640w, /media/putu-smile-1280.jpg 1280w" sizes="(max-width: 700px) 100vw, 50vw" width="1280" height="854" alt="Putu Ari smiling aboard the boat off Nusa Penida." loading="lazy" decoding="async" />
    <div><h2 id="charter-captain-title">Putu Ari</h2><p>Putu Ari is Bali Monster’s founder and captain. A Balinese guide and mechanic, he brings a decade of experience on the water. His favorite part of taking guests out is seeing them leave with a big smile.</p><a className="bm-button" href={bookingUrl('a boat day with Putu Ari')}>Plan a day with Putu <Arrow /></a></div>
  </section>;
}
export function Charters() {
 return <div className="bm bm-charters"><BrandHeader activity="BOAT CHARTERS" /><main id="main"><section className="bm-hero"><LoopVideo id="penida-hero" label="Nusa Penida by sea" hero /><div className="bm-hero-shade" /><div className="bm-hero-copy"><h1>NUSA PENIDA.<br /><em>by sea.</em></h1><p>Snorkeling, sunsets, sportfishing, and island transfers with a local captain and crew.</p><a className="bm-button" href="#experiences">Find your kind of day <Arrow /></a></div></section><MobileBooking /><section className="bm-section" id="experiences"><div className="bm-section-heading"><div><h2>Charter options</h2></div><p>Confirm routes, conditions, pricing, and availability before you book.</p></div><ActivityCards detail /></section><CharterFilm /><CharterCaptain /><IslandTrips /><SnorkelingStory /><BeachDays /><IslandStays /><SafetyNote /><section className="bm-end"><h2>Book a charter</h2><p>Share your dates, group size, and activity.<br />Confirm equipment, meeting points, and inclusions with the team.</p><a className="bm-button" href={bookingUrl('a boat charter')}>Chat on WhatsApp <Arrow /></a></section></main><BrandFooter /></div>;
}
