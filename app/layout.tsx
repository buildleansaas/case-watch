import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Case Watch',
  description: 'Open-source public-record explorer for Virginia criminal case outcomes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
