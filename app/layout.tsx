import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Jamshed Ali | Data Scientist & Analytics Expert',
  description: 'Portfolio of Jamshed Ali - Data Scientist and Analytics Expert specializing in Machine Learning, Data Analytics, and Visualization.',
  keywords: ['Data Scientist', 'Machine Learning', 'Analytics', 'Python', 'Power BI', 'Portfolio'],
  authors: [{ name: 'Jamshed Ali' }],
  openGraph: {
    title: 'Jamshed Ali | Data Scientist & Analytics Expert',
    description: 'Portfolio showcasing data science projects, machine learning models, and analytics dashboards.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-stone-950 text-stone-100 antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
