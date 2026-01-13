import type { Metadata, Viewport } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Wolf Bites - NC State Sports News',
  description: 'Your consolidated hub for NC State Wolfpack sports news from YouTube and podcasts',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wolf Bites',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Wolf Bites',
    title: 'Wolf Bites - NC State Sports News',
    description: 'Your consolidated hub for NC State Wolfpack sports news',
  },
  twitter: {
    card: 'summary',
    title: 'Wolf Bites - NC State Sports News',
    description: 'Your consolidated hub for NC State Wolfpack sports news',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#CC0000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('/sw.js')
                  .then((registration) => {
                    console.log('Service Worker registered:', registration);
                  })
                  .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
