import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from './context/AuthContext'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '-quoted.',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}