import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Properties',
  description: 'Property rental listings',
  keywords: 'rental, property'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
    </html>
  )
}
