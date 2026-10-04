/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
import type { Metadata } from 'next';
import { Arrow, Header, Footer, Photo, BrandIllustration } from './components';
import { faqsFor, type Faq } from './faqs';
import { bookingUrl, site } from './site';
import { JsonLd, faqSchema, serviceSchema } from './structured-data';
import type { TrackId } from './tracks';

export type TripPage = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: [string, string];
  answer: string;
  detail: string;
  photo: string;
  expect: Array<[string, string]>;
  tellUs: Array<[string, string]>;
  interest: string;
  action: string;
  topic: Faq['topics'][number];
  serviceType: string;
};

export function tripMetadata(page: TripPage): Metadata {
  const title = `${page.title} | ${site.name}`;
  const url = `${site.url}${page.path}`;
  const image = { url: `${site.url}${site.socialImage.path}`, width: site.socialImage.width, height: site.socialImage.height, alt: site.socialImage.alt };
  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description: page.description, images: [image] },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [image.url] },
  };
}

export function TripPageView({ page, track }: { page: TripPage; track?: TrackId }) {
  const faqs = faqsFor(page.topic);
  return <>
    <Header current={page.path} track={track} />
    <main id="main">
      <JsonLd data={serviceSchema({ path: page.path, name: page.title, description: page.description, serviceType: page.serviceType })} />
      <JsonLd data={faqSchema(faqs)} />
      <section className="trip-intro container" aria-labelledby="trip-title">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 id="trip-title">{page.heading[0]}<br /><span>{page.heading[1]}</span></h1>
        <div className="trip-intro-bottom">
          <div className="trip-answer"><p className="trip-lead">{page.answer}</p><p>{page.detail}</p></div>
          <a className="button button-lime" href={bookingUrl(page.interest)}>{page.action} <Arrow /></a>
        </div>
      </section>
      <section className="trip-details section-light" aria-labelledby="expect-title">
        <div className="container trip-grid">
          <div>
            <p className="eyebrow">WHAT TO EXPECT</p>
            <h2 id="expect-title">HOW A TRIP<br />COMES TOGETHER.</h2>
            <ol className="booking-steps">{page.expect.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </div>
          <div className="trip-photo"><Photo id={page.photo} sizes="(max-width: 1000px) 100vw, 45vw" /><div className="image-caption"><span>FROM ONE OF OUR TRIPS.</span><Arrow /></div></div>
        </div>
      </section>
      <section className="trip-details trip-details-tell section-light" aria-labelledby="tell-title">
        <div className="container trip-grid">
          <div>
            <p className="eyebrow">WHAT TO TELL US</p>
            <h2 id="tell-title">THE DETAILS<br />THAT HELP.</h2>
          </div>
          <ul className="booking-steps trip-tell">{page.tellUs.map(([title, text]) => <li key={title}><span aria-hidden="true">→</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
        </div>
      </section>
      <section className="faq section-light" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-title">A FEW<br />GOOD QUESTIONS.</h2><p className="trip-faq-more"><a className="text-link text-link-ink" href="/faq">All questions <Arrow /></a></p></div>
          <div className="faq-list">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
      <section className="final-cta" aria-labelledby="cta-title">
        <div className="container"><p className="eyebrow">BALI IS CALLING.</p><h2 id="cta-title">SEE YOU<br />OUT THERE.</h2><a className="button button-dark" href={bookingUrl(page.interest)}>{page.action} <Arrow /></a><a className="contact-number" href={bookingUrl(page.interest)}>{site.phoneDisplay}</a></div>
        <BrandIllustration />
      </section>
    </main>
    <Footer track={track} />
  </>;
}
