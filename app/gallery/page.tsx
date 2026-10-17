import type { Metadata } from 'next';
import { Arrow, Header, Footer, Photo, Film, BrandIllustration } from '../components';
import media from '../media-manifest.json';
import { bookingUrl, site } from '../site';

export const metadata: Metadata = {
  title: 'From the Water | Bali Monster Spearfishing',
  description: 'Photos and videos from Bali Monster spearfishing and boat trips.',
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: { type: 'website', url: `${site.url}/gallery`, title: 'From the Water | Bali Monster Spearfishing', description: 'Photos and videos from trips in Bali.', images: [{ url: `${site.url}/media/two-catches-1280.jpg`, width: 1280, height: 854, alt: 'Two spearfishers aboard a boat with their catches.' }] },
  twitter: { card: 'summary_large_image', title: 'From the Water | Bali Monster Spearfishing', images: [`${site.url}/media/two-catches-1280.jpg`] },
};
export default function Gallery() {
  return <><Header gallery /><main id="main"><section className="gallery-intro container"><h1>PHOTOS &amp; FILMS</h1><div className="gallery-intro-bottom"><nav className="gallery-jumps" aria-label="Gallery sections"><a href="#photos">The photos ↓</a><a href="#films">The films ↓</a></nav></div></section><section className="gallery-photos section-light" id="photos" aria-labelledby="photos-title"><div className="container"><div className="gallery-section-heading"><h2 id="photos-title">PHOTOS</h2></div><div className="photo-collection">{media.photos.map(photo => <figure className="gallery-photo" key={photo.id}><a href={`/media/${photo.id}-1280.jpg`} aria-label={`View full photo: ${photo.title}`}><Photo id={photo.id} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></a></figure>)}</div><p className="gallery-note">A look back at past trips. Conditions and encounters vary, and catches are never guaranteed.</p></div></section><section className="gallery-films" id="films" aria-labelledby="films-title"><div className="container"><div className="gallery-section-heading"><h2 id="films-title">FILMS</h2></div><div className="film-grid">{media.videos.map(clip => <Film id={clip.id} key={clip.id} showCaption={false} />)}</div></div></section><section className="final-cta" aria-labelledby="gallery-cta"><div className="container"><h2 id="gallery-cta">BOOK A TRIP</h2><p>Tell us your dates, your experience, and what you&apos;re into.</p><a className="button button-dark" href={bookingUrl()}>Plan your trip on WhatsApp <Arrow /></a></div><BrandIllustration /></section></main><Footer /></>;
}
