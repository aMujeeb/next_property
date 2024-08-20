import Footer from '@/components/Footer';
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';

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
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
