import type { Metadata } from 'next';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource-variable/manrope';
import { site } from './site';
import './globals.css';


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: [{ url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' }], apple: '/brand/icon-192.png' },
  title: 'Bali Monster Spearfishing | Spearfishing, Freediving & Charters',
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: { type: 'website', locale: 'en_US', url: site.url, siteName: site.name, title: 'Bali Monster Spearfishing | Chase the deep blue', description: site.description, images: [{ url: `${site.url}/media/two-catches-1280.jpg`, width: 1280, height: 854, alt: 'Two spearfishers aboard a boat with their catches.' }] },
  twitter: { card: 'summary_large_image', title: 'Bali Monster Spearfishing', description: site.description, images: [`${site.url}/media/two-catches-1280.jpg`] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
