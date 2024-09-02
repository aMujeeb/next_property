import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css'

//Adding Lightbox Gallery css  https://www.npmjs.com/package/react-photoswipe-gallery
import 'photoswipe/dist/photoswipe.css';

//Wrapping the entire application with Global Context

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
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}
