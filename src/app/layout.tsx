import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wolf Bites',
  description: 'Wolf Bites - A web application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
