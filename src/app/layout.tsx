import './globals.css'

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export const metadata: Metadata = {
  title: 'Select Component Showcase | shadcn/ui',
  description: 'A comprehensive demonstration of shadcn/ui Select component with empty value handling and various configurations.',
  keywords: ['shadcn/ui', 'select', 'react', 'nextjs', 'components'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-[Inter] antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}