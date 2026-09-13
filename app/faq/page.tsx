/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
import type { Metadata } from 'next';
import { Arrow, Header, Footer, BrandIllustration } from '../components';
import { faqs } from '../faqs';
import { bookingUrl, site } from '../site';
import { JsonLd, faqSchema } from '../structured-data';

const title = `Questions & Answers | ${site.name}`;
const description = 'Answers about booking, experience, pricing, locations, and what to expect on spearfishing, freediving, and charter trips with Bali Monster Spearfishing in Bali.';
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/faq` },
  openGraph: { type: 'website', url: `${site.url}/faq`, title, description, images: [{ url: `${site.url}${site.socialImage.path}`, width: site.socialImage.width, height: site.socialImage.height, alt: site.socialImage.alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${site.url}${site.socialImage.path}`] },
};

export default function FaqPage() {
  return <>
    <Header current="/faq" />
    <main id="main">
      <JsonLd data={faqSchema(faqs)} />
      <section className="trip-intro container" aria-labelledby="trip-title">
        <p className="eyebrow">BALI MONSTER / QUESTIONS &amp; ANSWERS</p>
        <h1 id="trip-title">ASK US<br /><span>ANYTHING.</span></h1>
        <div className="trip-intro-bottom">
          <div className="trip-answer"><p className="trip-lead">The questions we get asked most about spearfishing, freediving, and charters with Bali Monster Spearfishing in Bali.</p><p>Not answered here? Send it to us on WhatsApp.</p></div>
          <a className="button button-lime" href={bookingUrl()}>Ask on WhatsApp <Arrow /></a>
        </div>
      </section>
      <section className="faq faq-page section-light" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div><p className="eyebrow">EVERYTHING WE GET ASKED</p><h2 id="faq-title">BEFORE<br />YOU DIVE IN.</h2><nav className="trip-links" aria-label="Trip pages"><a className="text-link text-link-ink" href="/spearfishing-bali">Spearfishing in Bali <Arrow /></a><a className="text-link text-link-ink" href="/freediving-bali">Freediving in Bali <Arrow /></a><a className="text-link text-link-ink" href="/boat-charter-bali">Boat charters in Bali <Arrow /></a></nav></div>
          <div className="faq-list">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
      <section className="final-cta" aria-labelledby="cta-title">
        <div className="container"><p className="eyebrow">STILL WONDERING?</p><h2 id="cta-title">JUST<br />ASK.</h2><a className="button button-dark" href={bookingUrl()}>Chat with us on WhatsApp <Arrow /></a><a className="contact-number" href={bookingUrl()}>{site.phoneDisplay}</a></div>
        <BrandIllustration />
      </section>
    </main>
    <Footer />
  </>;
}
