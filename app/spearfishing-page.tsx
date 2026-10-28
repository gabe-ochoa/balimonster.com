import { Fragment } from 'react';
import LoopVideo from './loop-video';
import { BrandHeader, BrandFooter, MobileBooking } from './brand-pages';
/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
import { Arrow, Photo, Film, BrandIllustration } from './components';
import { bookingUrl, site } from './site';

const experiences = [
  { number: '01', title: 'Blue Water Drifting', description: 'Boat-supported drifts in open water, with routes chosen for your experience and the currents.', action: 'Plan a blue water trip', href: bookingUrl('blue water drifting') },
  { number: '02', title: 'Reef Hunting', description: 'Guided spearfishing around reefs and rocky structure, with sites chosen for the group and conditions.', action: 'Plan a reef trip', href: bookingUrl('reef hunting') },
  { number: '03', title: 'Missions', description: 'Special trips to remote locations accessible from Bali, including Java and the FADs off Singaraja.', action: 'Explore missions', href: '/missions' },
];
const faqs = [
  ['How do I book a trip?', 'Tap any WhatsApp button to start a chat with Bali Monster Spearfishing. Send your preferred activity, dates, group size, and experience. We will discuss the details with you before you book.'],
  ['Do I need previous experience?', 'The south side of Nusa Penida is best suited to intermediate and experienced spearfishers. We also have beginner spots and can help you build confidence on bluewater drifts. Tell us your experience so we can tailor the trip.'],
  ['I shot a fish, can I keep it?', 'Yes! Take it whole or ask us to fillet and portion it. We can also cook it at our shop in Sanur. If you do not catch a fish, we can share a guide’s catch or fish from our 300-litre freezer, subject to availability. Tell us your travel plans before taking fish onward.'],
  ['What does a trip cost and include?', 'Ask us on WhatsApp for pricing and inclusions for your chosen trip. Confirm equipment, transport, meeting points, and anything you need to bring before booking.'],
  ['Can I plan a trip around dogtooth tuna?', "Yes, tell us you're interested in hunting dogtooth tuna. We will discuss your experience and the trip options with you. Conditions and encounters vary, and catches are never guaranteed."],
];

const sectionOrders = {
  "current": [
    "boat",
    "penida",
    "trips",
    "captain",
    "safety",
    "equipment",
    "catch",
    "conservation",
    "photos",
    "article",
    "booking",
    "faq",
    "local",
    "cta"
  ],
  "trip-first": [
    "penida",
    "trips",
    "boat",
    "captain",
    "safety",
    "equipment",
    "catch",
    "conservation",
    "photos",
    "article",
    "local",
    "faq",
    "booking",
    "cta"
  ],
  "crew-first": [
    "captain",
    "penida",
    "trips",
    "boat",
    "safety",
    "equipment",
    "catch",
    "conservation",
    "photos",
    "article",
    "local",
    "faq",
    "booking",
    "cta"
  ]
} as const;
export default function SpearfishingPage({ variant = 'current' }: { variant?: keyof typeof sectionOrders }) {
  const sections = {
    boat: (<section className="section-light spear-boat" aria-labelledby="psa-title"><div className="container"><Photo id="dsc00785" sizes="(max-width: 700px) 100vw, 1200px" /><div className="boat-description"><h2 id="psa-title">BALI MONSTER’S BOAT</h2><p>Putri Sri Ayuni (PSA)</p>{variant === 'current' ? <><p>PSA is 38 ft (about 11.6 m) long. It runs commercial-grade four-stroke Suzuki outboards with 400 HP and carries up to six guests actively spearfishing. The boat lets us reach further zones while keeping the group comfortable between dives.</p><ul><li>Two freezer bags, each with over 250 litres of capacity, for keeping catches cold.</li><li>Fresh water and a toilet.</li><li>A semi-enclosed cabin for protection from the elements.</li><li>Garmin Fishfinder 585.</li><li>First aid kit and flares.</li><li>Electrical outlets for guests.</li><li>Bean bags.</li></ul></> : <><p>38 ft (about 11.6 m), with 400 HP from commercial-grade four-stroke Suzuki outboards and room for six guests actively spearfishing.</p><ul><li>Garmin Fishfinder 585, first aid kit, and flares.</li><li>Two freezer bags, each over 250 litres, to keep catches cold.</li><li>Semi-enclosed cabin, bean bags, and electrical outlets.</li><li>Fresh water and a toilet.</li></ul></>}</div></div></section>),
    penida: (<section className="hunt" id="the-hunt" aria-labelledby="hunt-title"><div className="container hunt-grid"><div className="hunt-image"><Photo id="putu-commercial" /></div><div className="hunt-copy"><h2 id="hunt-title">SPEARFISHING<br />NUSA PENIDA</h2><p className="hunt-lead">Seamounts, rocky structure, and bluewater drifts for intermediate and experienced spearfishers.</p><p>Reading the currents and working the drifts calls for an experienced local guide. Our main targets include Dogtooth Tuna, Giant Trevally, Wahoo, Spanish Mackerel, Red Bass, and Longnose Emperor.</p><p className="conditions">For beginners, we choose suitable spots and help build comfort on bluewater drifts. Depending on the location and conditions, targets can include unicornfish, leatherjacket, oleh-oleh, milkfish, assorted trevally, and selected surgeonfish. Catches are never guaranteed.</p><a className="text-link" href={bookingUrl('spearfishing for dogtooth tuna')}>Let&apos;s talk dogtooth <Arrow /></a><p>New to spearfishing or planning a local half-day? <a className="text-link" href="#jukung">Explore Baresa Cargo trips <Arrow /></a></p></div></div></section>),
    trips: (<section className="experiences section-light" id="experiences" aria-labelledby="experiences-title"><div className="container"><div className="section-heading"><div><h2 id="experiences-title">TRIP OPTIONS</h2></div></div><div className="experience-grid">{experiences.map(experience => <article className="experience" key={experience.number}><h3>{experience.title}</h3><p>{experience.description}</p><a href={experience.href}>{experience.action}<Arrow /></a></article>)}</div></div></section>),
    captain: (<section className="section-light spear-detail" aria-labelledby="putu-title"><div className="container spear-profile"><Photo id="max04603" /><div><h2 id="putu-title">PUTU ARI</h2><p>Putu Ari is Bali Monster’s founder and captain. A Balinese commercial spearfisherman and mechanic, he brings a decade of spearfishing, guiding, and engine work.</p><p>A captain and crew remain aboard during dives and can diagnose mechanical problems. If a problem cannot be resolved safely, the trip stops.</p><a className="text-link" href={bookingUrl('spearfishing with Putu Ari')}>Plan a day with Putu <Arrow /></a></div></div></section>),
    safety: (<section className="spear-safety" aria-labelledby="spear-safety-title"><h2 id="spear-safety-title">BOAT SAFETY</h2><p>Our boat, Putri Sri Ayuni (PSA), carries life jackets, safety equipment, a medical kit, and an EPIRB emergency beacon. We cancel trips when conditions are dangerous, and tailor every trip to the group’s experience and comfort.</p></section>),
    equipment: (<section className="section-light spear-detail"><div className="container"><h2>EQUIPMENT</h2><p>We provide Andre Spearguns for our guests on trips. Spearfishing and freediving gear and supplies are available in our Sanur shop.</p></div></section>),
    catch: (<section className="section-light spear-detail"><div className="container spear-profile"><div><h2>CATCH CARE</h2><p>We serve sashimi to our guests and keep catches on ice in Opah Kill Bags, commercial-grade tuna fishing bags from the USA. Clean handling and a cold catch are part of every fishing day.</p><p>Enjoy your fish with us, have it cooked at our Sanur shop, or ask the crew to prepare it to take home.</p></div><Photo id="fresh-fillet" /></div></section>),
    conservation: (<section className="section-light spear-detail" id="conservation" aria-labelledby="conservation-title"><div className="container"><h2 id="conservation-title">REEF CONSERVATION</h2><p>We care about healthy reefs and being good neighbors on the water. On Bali Monster trips:</p><ul><li>Only target fish you intend to eat. Follow Putu’s guidance on identifying and choosing fish for the table.</li><li>Do not shoot if you spot scuba divers or snorkelers on a drift. Alert your guide promptly.</li><li>When spearfishing and freediving, achieve neutral buoyancy at the bottom. Keep off coral. If you need a handhold, use rock rather than coral.</li><li>Never target Napoleon wrasse, stingrays, manta rays, turtles (kura kura), sharks, pufferfish, or boxfish.</li></ul></div></section>),
    photos: (<section className="trip-preview section-light" aria-labelledby="trip-preview-title"><div className="container"><div className="section-heading"><div><h2 id="trip-preview-title">TRIP PHOTOS</h2></div><div className="preview-intro"><a className="text-link" href="/gallery">See the photos &amp; films <Arrow /></a></div></div><div className="preview-grid">{['two-catches', 'between-dives', 'sunset-crew'].map((id) => <a className="preview-card" href="/gallery#photos" key={id}><Photo id={id} sizes="(max-width: 700px) 100vw, 33vw" /></a>)}</div><div className="home-film"><Film id="coastal-run" showCaption={false} /><div><h2>BOAT CHARTERS</h2><p>Snorkeling, sunset trips, sportfishing, and island transfers are also available.</p><a className="text-link" href={bookingUrl('a boat charter')}>Plan a boat day <Arrow /></a></div></div></div></section>),
    article: (<section className="bm bm-section"><h2>Spearfishing<br />in Indonesia.</h2><p>What to expect from the currents, the drifts, and a day with an experienced local crew.</p><a className="bm-link" href="/blog/spearfishing-in-indonesia">Read the field notes <Arrow /></a></section>),
    booking: (<section className="booking section-light" id="plan-your-trip" aria-labelledby="booking-title"><div className="container booking-grid"><div><h2 id="booking-title">HOW TO BOOK</h2></div><ol className="booking-steps"><li><span>01</span><div><h3>Tell us what you&apos;re into.</h3><p>Blue water drifting, reef hunting, or a mission. Tell us which trip interests you.</p></div></li><li><span>02</span><div><h3>Share a few details.</h3><p>Your dates, group size, and experience help us talk through the right trip for you.</p></div></li><li><span>03</span><div><h3>Plan it together.</h3><p>We&apos;ll discuss availability, pricing, meeting points, and what to bring on WhatsApp.</p></div></li></ol></div></section>),
    faq: (<section className="faq section-light" aria-labelledby="faq-title"><div className="container faq-grid"><div><h2 id="faq-title">QUESTIONS</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>),
    local: (<section className="section-light spear-detail" id="jukung" aria-labelledby="jukung-title"><div className="container"><div className="boat-description"><h2 id="jukung-title">LOCAL TRIPS ON BARESA CARGO</h2><p>For half-day local trips or spearos on a budget, we use Putu’s jukung, Baresa Cargo, for nearshore spearfishing. This is a local-style trip for one or two spearos, with lunch included.</p><p>If you’re learning to spearfish and are a true beginner, this is a good place to start. We visit Serangan, Benoa, and Nusa Dua. These trips do not go to Nusa Penida.</p><a className="text-link" href={bookingUrl('a half-day local trip on Baresa Cargo')}>Ask about a local trip <Arrow /></a></div><div className="jukung-photos"><Photo id="jukung-9197" /><Photo id="jukung-3071" /></div></div></section>),
    cta: (<section className="final-cta" aria-labelledby="cta-title"><div className="container"><h2 id="cta-title">BOOK A TRIP</h2><a className="button button-dark" href={bookingUrl()}>Chat with us on WhatsApp <Arrow /></a><a className="contact-number" href={bookingUrl()}>{site.phoneDisplay}</a></div><BrandIllustration /></section>)
  };
  return <><div className="bm"><BrandHeader activity="SPEARFISHING" /></div><main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <LoopVideo id="spearfishing-20261023" label="Spearfishing in Bali" hero /><div className="hero-shade" />
        <div className="container hero-inner"><div className="hero-copy"><h1 id="hero-title" className="spear-hero-title">SPEARFISHING BALI,<br /><span>REIMAGINED.</span></h1><p className="hero-description">Guided trips with Putu Ari, a Balinese captain with a decade of spearfishing experience.</p><a className="button button-lime" href={bookingUrl()}>Plan your trip on WhatsApp <Arrow /></a></div><div className="hero-bottom"><a href="#experiences">Explore the experiences <span aria-hidden="true">↓</span></a></div></div>
      </section>
<MobileBooking activity="spearfishing" />
{sectionOrders[variant].map(key => <Fragment key={key}>{sections[key]}</Fragment>)}
</main><div className="bm"><BrandFooter /></div></>;
}
