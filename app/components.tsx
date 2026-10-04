/* Static Pages navigation uses native links so page and hash navigation work without the client router. */
/* eslint-disable @next/next/no-html-link-for-pages */
import { bookingUrl } from './site';
import { tracks, trackList, type TrackId } from './tracks';
import media from './media-manifest.json';

export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function Brand() {
  // Transparency is baked into the PNG so the logo works without CSS masking.
  // eslint-disable-next-line @next/next/no-img-element
  return <a className="brand" href="/#top" aria-label="Bali Monster Spearfishing home"><img src="/brand/bali-monster-logo-transparent.png" width={1536} height={1024} alt="Bali Monster Spearfishing" /></a>;
}
// Text wordmark: the brand first, the activity after. Used wherever the spearfishing logo would mislabel a page.
export function Wordmark({ track, href }: { track?: TrackId; href?: string }) {
  const activity = track ? tracks[track].activity : undefined;
  return <a className="wordmark" href={href ?? (track ? tracks[track].path : '/?choose')} aria-label={`${track ? tracks[track].name : 'Bali Monster'} home`}><b>Bali Monster</b>{activity && <small>{activity}</small>}</a>;
}
// Segmented switch between the two sides of the site. The current side is marked, the other is one tap away.
export function TrackToggle({ track }: { track?: TrackId }) {
  return <nav className="track-toggle" aria-label="Choose your trip type">{trackList.map(item => <a key={item.id} href={item.path} aria-current={item.id === track ? 'page' : undefined}>{item.activity === 'Charters' ? 'Boat charters' : item.activity}</a>)}</nav>;
}
export function Header({ gallery = false, current, track }: { gallery?: boolean; current?: string; track?: TrackId }) {
  // Trip pages share the gallery's dark header so the intro sits on the ocean ground.
  const dark = gallery || Boolean(current);
  // Pages without a side (gallery, FAQ, the spearfishing and freediving trip pages) belong to the spearfishing side's menu.
  const home = track ? tracks[track].path : tracks.spearfishing.path;
  return <><a className="skip-link" href="#main">Skip to content</a><header className={`site-header${dark ? ' gallery-header' : ''}${track ? ' track-header' : ''}`} id="top"><div className="container header-inner">{track ? <Wordmark track={track} /> : <Brand />}{track && <TrackToggle track={track} />}<nav aria-label="Main navigation"><a href={`${home}#experiences`}>The experiences</a><a className="gallery-nav" href="/gallery" aria-current={gallery ? 'page' : undefined}>From the water</a><a className="header-cta" href={bookingUrl(track ? tracks[track].interest : undefined)}>Let&apos;s talk <Arrow /></a></nav></div></header></>;
}
// Quiet cross-link near the bottom of each side, for the visitor who picked wrong or wants both.
export function TrackCrossLink({ track }: { track: TrackId }) {
  const other = track === 'spearfishing' ? tracks.charters : tracks.spearfishing;
  return <section className="track-cross" aria-label="The other side of Bali Monster"><div className="container"><p className="eyebrow">ALSO FROM BALI MONSTER</p><h2>{other.tagline.toUpperCase()}</h2><p>{other.summary}</p><a className="text-link" href={other.path}>{other.name} <Arrow /></a></div></section>;
}
export function Footer({ track, neutral = false }: { track?: TrackId; neutral?: boolean } = {}) {
  // The landing page is deliberately brand-only, so it gets the plain wordmark instead of the spearfishing logo.
  return <><footer className="site-footer"><div className="container footer-main">{track ? <Wordmark track={track} /> : neutral ? <Wordmark href="/?choose" /> : <Brand />}<p>{track === 'charters' ? <>Snorkeling, sunsets, camping, sportfishing &amp; transfers.</> : neutral ? <>Spearfishing trips &amp; boat charters.</> : <>Spearfishing, freediving &amp; charters.</>}<br />Bali, Indonesia.</p><nav className="footer-links" aria-label="Trips and information"><a href={tracks.spearfishing.path}>Bali Monster Spearfishing</a><a href={tracks.charters.path}>Bali Monster Charters</a><a href="/spearfishing-bali">Spearfishing in Bali</a><a href="/freediving-bali">Freediving in Bali</a><a href="/boat-charter-bali">Boat charters in Bali</a><a href="/faq">Questions &amp; answers</a><a className="footer-gallery" href="/gallery">From the water <Arrow /></a></nav><a href={bookingUrl(track ? tracks[track].interest : undefined)}>Let&apos;s get on the water <Arrow /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Bali Monster</span><span>balimonster.com</span></div></footer><a className="mobile-booking" href={bookingUrl(track ? tracks[track].interest : undefined)}>Plan your trip on WhatsApp <Arrow /></a></>;
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
