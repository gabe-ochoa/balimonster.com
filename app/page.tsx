/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
/* Option 2: no popup. The homepage is the choice. Two full-height panels, one per side, and nothing else
   competes with them. Hovering a panel widens it; on a phone they stack. */
import type { Metadata } from 'next';
import { Arrow, Footer, Photo, Wordmark } from './components';
import { bookingUrl, site } from './site';
import { redirectToTrackScript, trackList } from './tracks';

// The front door is brand-only, so it does not inherit the spearfishing title from the layout.
const title = 'Bali Monster | Spearfishing Trips & Boat Charters in Bali';
const description = 'Bali Monster runs two kinds of days on the water in Bali: spearfishing and freediving trips for the hunt, and private boat charters for snorkeling, sunset cruises, island camping, sportfishing, and island transfers. Pick your side and plan it on WhatsApp.';
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: site.url },
  openGraph: { type: 'website', url: site.url, title, description, images: [{ url: `${site.url}/media/coastal-run-1280.jpg`, width: 1280, height: 720, alt: 'A boat crosses blue water beside a coastal rock arch.' }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${site.url}/media/coastal-run-1280.jpg`] },
};

export default function Landing() {
  return <>
    <script dangerouslySetInnerHTML={{ __html: redirectToTrackScript() }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="split-header" id="top"><Wordmark href="/?choose" /><a className="header-cta" href={bookingUrl()}>Let&apos;s talk <Arrow /></a></header>
    <main id="main">
      <h1 className="split-title">One island. Two ways out on the water. Pick your side of Bali Monster.</h1>
      <section className="split" aria-label="Choose your trip type">{trackList.map(track => <a className={`split-panel split-${track.id}`} href={track.path} key={track.id}>
        <Photo id={track.photo} className="split-photo" priority sizes="(max-width: 700px) 100vw, 50vw" /><div className="split-shade" />
        <div className="split-copy"><p className="eyebrow">BALI MONSTER</p><h2>{track.activity === 'Charters' ? <>BOAT<br />CHARTERS.</> : <>SPEAR<br />FISHING.</>}</h2><p className="split-tagline">{track.tagline}</p><ul className="split-list">{track.list.map(item => <li key={item}>{item}</li>)}</ul><span className="split-go">{track.activity === 'Charters' ? 'Plan a boat day' : 'Into the blue'} <Arrow /></span></div>
      </a>)}</section>
      <p className="split-note container">Same boats, same crew, same coastline. Two very different days. We&apos;ll remember your pick, and you can switch sides from the menu any time.</p>
    </main>
    <Footer neutral />
  </>;
}
