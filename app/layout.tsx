import '../styles/globals.css';
import React from 'react'

export const metadata = {
  title: 'AIM Email SaaS',
  description: 'Váš vlastní e-mail marketingový nástroj'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="p-8">
        <h1 className="text-3xl font-bold mb-4">AIM Email SaaS</h1>
        {children}
      </body>
    </html>
  )
}
