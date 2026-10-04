import type { Metadata } from 'next';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource-variable/manrope';
import { site } from './site';
import './globals.css';
import './brand.css';


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: [{ url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' }], apple: '/brand/icon-192.png' },
  title: 'Bali Monster | Ocean Adventures in Bali',
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: { type: 'website', locale: 'en_US', url: site.url, siteName: site.name, title: 'Bali Monster | The ocean. Your way.', description: site.description, images: [{ url: `${site.url}/media/coastal-run-1280.jpg`, width: 1280, height: 720, alt: 'A boat travels beside a coastal rock arch in Bali.' }] },
  twitter: { card: 'summary_large_image', title: 'Bali Monster', description: site.description, images: [`${site.url}/media/coastal-run-1280.jpg`] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
