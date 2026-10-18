import { BrandHeader, BrandFooter } from '../brand-pages';
import { Photo, Arrow } from '../components';
import { bookingUrl, site } from '../site';

const title = 'Spearfishing Missions | Bali Monster';
const description = 'Special spearfishing trips from Bali to Alas Purwo in Java and the rumpon off Singaraja. Liveaboard details to be announced.';
export const metadata = {
  title, description, alternates: { canonical: `${site.url}/missions` },
  openGraph: { title, description, url: `${site.url}/missions`, images: [{ url: `${site.url}/media/max04219-1280.jpg`, width: 1280, height: 852, alt: 'Two people sit on a beach beside an outrigger boat.' }] },
};

export default function Missions() {
  return <div className="bm bm-journal"><BrandHeader activity="SPEARFISHING" /><main id="main">
    <article className="bm-article bm-missions">
      <header><a className="bm-link" href="/spearfishing">← Back to spearfishing</a><h1>Missions</h1><p>Special trips to remote locations accessible from Bali. We plan each route around your experience, sea conditions, and confirmed access.</p>
      <nav className="mission-nav" aria-label="Mission destinations"><a href="#alas-purwo">Alas Purwo</a><a href="#last-rumpon">The Last Rumpon</a><a href="#liveaboards">Liveaboards</a></nav></header>
      <section id="alas-purwo" aria-labelledby="alas-title"><h2 id="alas-title">Alas Purwo, Java</h2>
        <Photo id="max04219" priority sizes="(max-width: 800px) 100vw, 900px" />
        <div className="bm-article-body"><p>When conditions allow, we travel to the coast around Alas Purwo National Park at the tip of Java. Sleep aboard the boat, explore remote beaches, and plan guided dives around reefs and steep drop-offs targeting dogtooth tuna.</p>
        <p>Surfing and shipwrecks offer other ways to explore the area. Longer trips can continue along Java’s south coast when conditions permit. Mola mola and whale sharks may be encountered; wildlife sightings and catches are never guaranteed.</p>
        <p>Visibility can be low. We confirm suitable dive sites, access, and overnight arrangements before booking.</p>
        <a className="bm-button" href={bookingUrl('the Alas Purwo mission in Java')}>Ask about Alas Purwo <Arrow /></a></div>
        <div className="mission-photos"><Photo id="max04692" /><Photo id="max04263" /></div>
      </section>
      <section id="last-rumpon" aria-labelledby="rumpon-title" className="bm-article-body"><h2 id="rumpon-title">The Last Rumpon, Singaraja</h2>
        <p>Take our speedboat to northern Bali for a long day of blue water hunting around rumpon, the fish aggregating devices known as FADs. The area has hundreds of rumpon, including distant structures used by commercial tuna fishers. We choose the day’s stops around conditions and access.</p>
        <p>Targets include yellowfin tuna, wahoo, mahi-mahi, sailfish, and swordfish. Catches are never guaranteed.</p>
        <p>For this mission, we partner with Abdul Kadir of <a href="https://www.instagram.com/spearfishing.northbali/">North Bali Spearfishing</a>, whose work includes building and establishing FADs for spearfishers.</p>
        <a className="bm-button" href={bookingUrl('The Last Rumpon mission in Singaraja')}>Ask about The Last Rumpon <Arrow /></a>
      </section>
      <section id="liveaboards" className="bm-article-body"><h2>Liveaboards</h2><p>Details and dates to be announced.</p></section>
    </article>
  </main><BrandFooter /></div>;
}
