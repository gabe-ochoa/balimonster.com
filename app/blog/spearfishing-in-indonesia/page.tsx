import { BrandHeader, BrandFooter } from '../../brand-pages';
import { Photo, Arrow } from '../../components';
import { bookingUrl, site } from '../../site';

const title = 'So you want to go spearfishing in Indonesia: here’s what to expect';
const description = 'Bali Monster’s perspective on Indonesia’s spectacular waters, changing currents, drift diving, and choosing experienced local guides.';
const url = `${site.url}/blog/spearfishing-in-indonesia`;
export const metadata = {
  title: `${title} | Bali Monster`, description,
  alternates: { canonical: url },
  openGraph: { type: 'article', url, title, description, siteName: site.name, images: [{ url: `${site.url}/media/below-the-surface-1280.jpg`, width: 1280, height: 720, alt: 'A freediver in blue water.' }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${site.url}/media/below-the-surface-1280.jpg`] },
};

const guides = [
  ['spearfishing.northbali', 'Singaraja FADs'],
  ['indospearfishing', 'Uluwatu'],
  ['gusame_spearfishingbali', 'Kuta'],
  ['tabasanbalispearfishing', 'Serangan / Nusa Dua'],
];

export default function SpearfishingInIndonesia() {
  return <div className="bm bm-journal"><BrandHeader activity="FIELD NOTES" /><main id="main">
    <article className="bm-article">
      <header><a className="bm-link" href="/spearfishing">← Back to spearfishing</a><p className="bm-kicker">BALI MONSTER / FIELD NOTES</p><h1>So you want to go spearfishing in Indonesia.</h1><p className="bm-article-deck">Here’s what to expect.</p><p className="bm-article-byline">From the Bali Monster team · October 14, 2026</p></header>
      <Photo id="below-the-surface" priority sizes="(max-width: 800px) 100vw, 900px" />
      <div className="bm-article-body">
        <p className="bm-article-lead">Extraordinary biodiversity. Dramatic underwater terrain. Water that can change character in a moment. Indonesia is one of the most beautiful and demanding places we know to freedive and spearfish.</p>
        <h2>Beautiful water. Serious currents.</h2>
        <p>Around Bali, closely spaced islands, deep drop-offs, and seamounts shape the diving. Channels can funnel fast-moving water, and the interaction between current and structure makes each location different. The fish, the visibility, and the conditions rarely stand still.</p>
        <p>A quiet drift can suddenly feel like Jurassic Park when current, structure, and fish line up. Those moments are memorable. They also demand patience, conservative decisions, and a crew that knows the area.</p>
        <h2>A day built around the drift</h2>
        <p>Much of our spearfishing around Bali is drift diving. The boat positions the group up-current, divers move with the water toward suitable structure, and the crew picks them up before repositioning for another drift.</p>
        <p>Fish activity often gathers around structure and current-facing edges. Some drifts may offer only one or two suitable dives. Changing conditions can mean more time repositioning in the boat, switching spots, or deciding to stop. That is part of the day, not a reason to push past your limits.</p>
        <p>Your guide’s briefing determines the plan for the conditions and the group. A description of drift diving cannot replace in-water training, local judgment, or an agreed pickup and emergency plan.</p>
        <h2>Respect the structure</h2>
        <p>Seamounts, small islands, and rocks that break the surface can hold remarkable fish life. They also bring challenges. Nusa Penida and the wider Indonesian archipelago deserve respect, including from experienced spearfishers.</p>
        <p>Never dive alone. Stay with an experienced guide or buddy, maintain an agreed buddy system, and dive conservatively. Discuss your experience honestly before booking. A fish or a promising patch of water is never worth losing contact with your buddy or crew.</p>
        <h2>Choose the guide as carefully as the destination</h2>
        <p>Hiring a local fishing boat can sound like an inexpensive way out to sea. A boat ride alone does not provide a spearfishing guide, a buddy system, or a crew prepared for drift diving. Even experienced visitors should confirm local expertise, pickup procedures, and safety arrangements.</p>
        <p>If you are starting out or watching your budget, talk to an established local guide about a suitable trip. There are dedicated spearfishing teams around Bali. Some friends of Bali Monster include:</p>
        <ul className="bm-guide-list">{guides.map(([handle, area]) => <li key={handle}><a href={`https://www.instagram.com/${handle}/`}>@{handle}</a><span>{area}</span></li>)}</ul>
        <p>Contact each team directly to discuss current trips, experience requirements, and availability.</p>
        <aside className="bm-article-callout"><p className="bm-kicker">OUR APPROACH</p><h2>Safety before the catch.</h2><p>At Bali Monster, we plan around your experience and comfort. Dangerous conditions mean cancelling the trip. Come for the water, the learning, and the time with the crew. Catches are never guaranteed.</p><a className="bm-button" href={bookingUrl('spearfishing in Indonesia')}>Talk through your trip <Arrow /></a></aside>
      </div>
    </article>
  </main><BrandFooter /></div>;
}
