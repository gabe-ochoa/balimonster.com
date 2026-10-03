/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
/* Option 1: a neutral Bali Monster front door with a popup that asks which side of the water you are here for.
   The same two cards sit inline on the page, so the popup is a shortcut rather than a wall. */
import { Arrow, Footer, Photo, Wordmark } from './components';
import { bookingUrl } from './site';
import { redirectToTrackScript, trackList } from './tracks';

// Opens the chooser as a modal when the page loads, unless the visitor has already picked a side or came back to change it.
const openChooserScript = `try{var d=document.getElementById('chooser');if(d&&d.showModal&&!/choose/.test(location.search+location.hash)&&!localStorage.getItem('bm-track'))d.showModal()}catch(e){}`;

function Choice({ className }: { className: string }) {
  return <div className={className}>{trackList.map(track => <a className={`choice choice-${track.id}`} href={track.path} key={track.id}><span className="choice-eyebrow">BALI MONSTER</span><span className="choice-title">{track.activity === 'Charters' ? 'Boat charters' : track.activity}</span><span className="choice-tagline">{track.tagline}</span><span className="choice-list">{track.list.join(' · ')}</span><span className="choice-go">{track.activity === 'Charters' ? 'Plan a boat day' : 'Into the blue'} <Arrow /></span></a>)}</div>;
}

export default function Landing() {
  return <>
    <script dangerouslySetInnerHTML={{ __html: redirectToTrackScript() }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header landing-header" id="top"><div className="container header-inner"><Wordmark href="/?choose" /><nav aria-label="Main navigation">{trackList.map(track => <a href={track.path} key={track.id}>{track.activity === 'Charters' ? 'Boat charters' : track.activity}</a>)}<a className="header-cta" href={bookingUrl()}>Let&apos;s talk <Arrow /></a></nav></div></header>
    <main id="main">
      <section className="hero landing-hero" aria-labelledby="hero-title">
        <Photo id="coastal-run" className="hero-photo" priority sizes="100vw" /><div className="hero-shade" />
        <div className="container hero-inner"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> BALI, INDONESIA · BOATS, BLUE WATER, GOOD DAYS</p><h1 id="hero-title">ONE ISLAND.<br /><span>TWO WAYS OUT.</span></h1><p className="hero-description">Bali Monster runs two kinds of days on the water: spearfishing trips for the hunt, and boat charters for everyone else.<br />Pick your side and we&apos;ll show you the right trips.</p><a className="button button-lime" href="#choose-inline">Choose your day <span aria-hidden="true">↓</span></a></div></div>
      </section>
      <section className="landing-choose section-light" id="choose-inline" aria-labelledby="choose-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">WHICH BRINGS YOU HERE?</p><h2 id="choose-title">PICK<br />YOUR SIDE.</h2></div><p>Same boats, same crew, same coastline.<br />Two very different days. We&apos;ll remember your pick.</p></div><Choice className="choice-grid" /></div></section>
    </main>
    <Footer neutral />
    <dialog className="chooser" id="chooser" aria-labelledby="chooser-title">
      <form method="dialog" className="chooser-inner">
        <p className="eyebrow">WELCOME TO BALI MONSTER</p>
        <h2 id="chooser-title">WHAT BRINGS YOU<br />TO THE WATER?</h2>
        <Choice className="chooser-grid" />
        <button className="chooser-close" type="submit">Just looking around for now</button>
      </form>
    </dialog>
    <script dangerouslySetInnerHTML={{ __html: openChooserScript }} />
  </>;
}
