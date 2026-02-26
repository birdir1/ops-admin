import './globals.css';

export const metadata = {
  title: 'birdir1 Ops',
  description: 'Portfolio ops console',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
