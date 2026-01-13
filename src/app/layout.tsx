import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wolf Bites - NC State Sports News',
  description: 'Your consolidated hub for NC State Wolfpack sports news from YouTube, Twitter, and podcasts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
