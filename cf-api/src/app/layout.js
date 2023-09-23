import './globals.scss'
import { Inter } from 'next/font/google'
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Click Fakerry',
  description: 'Comparador de ofertas de ferries a Baleares, Marruecos, Italia, Canarias... Reserva tu billete de ferry al mejor precio. Más de 8.000 opiniones positivas.',
  icons: {
    icon: '/myfavicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
