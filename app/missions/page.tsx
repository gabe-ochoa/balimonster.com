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
        <div className="bm-article-body"><p>When conditions allow, we go to the murky, Jurassic national park at the tip of Java. We sleep on our boat under the stars and hunt steep drop-offs for dogtooth, explore remote beaches, and hunt reefs.</p>
        <p>There’s good surfing and shipwrecks, and we can extend the trip to explore the south side of Java when conditions allow. Gentle giants like mola mola and whale sharks frequent the area as well.</p>
        <a className="bm-button" href={bookingUrl('the Alas Purwo mission in Java')}>Ask about Alas Purwo <Arrow /></a></div>
        <div className="mission-photos"><Photo id="max04692" /><Photo id="max04263" /></div>
      </section>
      <section id="last-rumpon" aria-labelledby="rumpon-title" className="bm-article-body"><h2 id="rumpon-title">The Last Rumpon, Singaraja</h2>
        <p>We take our speedboat to the northernmost point of Bali and access hundreds of rumpon (FADs) for a very long day of blue water hunting. The furthest rumpon are used by commercial tuna fishermen and almost always have life. We’re targeting yellowfin tuna, wahoo, mahi-mahi, and sailfish/swordfish.</p>
        <p>For Mission: The Last Rumpon, we partner with our friend and Balinese legend Abdul Kadir of <a href="https://www.instagram.com/spearfishing.northbali/">North Bali Spearfishing</a>, whose influence and work in building and establishing spearfishermen’s FADs is unmatched.</p>
        <a className="bm-button" href={bookingUrl('The Last Rumpon mission in Singaraja')}>Ask about The Last Rumpon <Arrow /></a>
      </section>
      <section id="liveaboards" className="bm-article-body"><h2>Liveaboards</h2><p>More information to come soon, but we’ve got exciting plans.</p></section>
    </article>
  </main><BrandFooter /></div>;
}
