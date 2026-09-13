/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
/* eslint-disable @next/next/no-html-link-for-pages */
import { bookingUrl } from './site';
import media from './media-manifest.json';

export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function Brand() {
  // Transparency is baked into the PNG so the logo works without CSS masking.
  // eslint-disable-next-line @next/next/no-img-element
  return <a className="brand" href="/#top" aria-label="Bali Monster Spearfishing home"><img src="/brand/bali-monster-logo-transparent.png" width={1536} height={1024} alt="Bali Monster Spearfishing" /></a>;
}
export function Header({ gallery = false, current }: { gallery?: boolean; current?: string }) {
  // Trip pages share the gallery's dark header so the intro sits on the ocean ground.
  const dark = gallery || Boolean(current);
  return <><a className="skip-link" href="#main">Skip to content</a><header className={`site-header${dark ? ' gallery-header' : ''}`} id="top"><div className="container header-inner"><Brand /><nav aria-label="Main navigation"><a href="/#experiences">The experiences</a><a className="gallery-nav" href="/gallery" aria-current={gallery ? 'page' : undefined}>From the water</a><a className="header-cta" href={bookingUrl()}>Let&apos;s talk <Arrow /></a></nav></div></header></>;
}
export function Footer() {
  return <><footer className="site-footer"><div className="container footer-main"><Brand /><p>Spearfishing, freediving &amp; charters.<br />Bali, Indonesia.</p><nav className="footer-links" aria-label="Trips and information"><a href="/spearfishing-bali">Spearfishing in Bali</a><a href="/freediving-bali">Freediving in Bali</a><a href="/boat-charter-bali">Boat charters in Bali</a><a href="/faq">Questions &amp; answers</a><a className="footer-gallery" href="/gallery">From the water <Arrow /></a></nav><a href={bookingUrl()}>Let&apos;s get on the water <Arrow /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Bali Monster Spearfishing</span><span>balimonster.com</span></div></footer><a className="mobile-booking" href={bookingUrl()}>Plan your trip on WhatsApp <Arrow /></a></>;
}

export function Photo({ id, className, priority = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { id: string; className?: string; priority?: boolean; sizes?: string }) {
  const photo = media.photos.find(photo => photo.id === id);
  const clip = media.videos.find(clip => clip.id === id);
  const item = photo ?? clip;
  if (!item) throw new Error(`Unknown media: ${id}`);
  // Static Pages assets use explicit responsive derivatives; no image server is needed.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={`/media/${id}-1280.jpg`} srcSet={`/media/${id}-640.jpg 640w, /media/${id}-1280.jpg ${item.width}w`} sizes={sizes} width={item.width} height={item.height} alt={photo?.alt ?? clip?.description ?? ''} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}
export function Film({ id }: { id: string }) {
  const clip = media.videos.find(clip => clip.id === id);
  if (!clip) throw new Error(`Unknown video: ${id}`);
  return <figure className="film"><video controls muted playsInline preload="none" poster={`/media/${id}-1280.jpg`} width={clip.width} height={clip.height} aria-label={clip.title} aria-describedby={`${id}-caption`}><source src={`/media/${id}.mp4`} type="video/mp4" /><a href={`/media/${id}.mp4`}>Watch {clip.title}</a></video><figcaption id={`${id}-caption`}><span className="film-label">{clip.duration} SEC · SILENT CLIP</span><h3>{clip.title}</h3><p>{clip.description}</p></figcaption></figure>;
}

export function BrandIllustration() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="brand-illustration" src="/brand/bali-monster-icon.jpg" width={1536} height={1024} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}
