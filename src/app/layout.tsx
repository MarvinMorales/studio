import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { websiteData } from '@/lib/data';

const { businessInformation } = websiteData;

export const metadata: Metadata = {
  metadataBase: new URL(businessInformation.websiteDomain),
  title: {
    default: 'One Security - Soluciones Integrales de Tecnología para Retail',
    template: `%s | One Security`,
  },
  description: 'One Security ofrece soluciones integrales de tecnología para retail en Ecuador, incluyendo sistemas antihurto (EAS), preciadores electrónicos, CCTV con IA, RFID y más. Protegemos y optimizamos tu negocio.',
  openGraph: {
    title: 'One Security - Soluciones Integrales de Tecnología para Retail',
    description: 'Líderes en seguridad y optimización para retail. Descubre nuestras soluciones de vanguardia.',
    url: businessInformation.websiteDomain,
    siteName: 'One Security',
    images: [
      {
        url: 'https://www.onesecurity.com.ec/wp-content/uploads/2021/01/logox11.png', 
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Security - Soluciones para Retail',
    description: 'Protege y optimiza tu negocio con nuestras soluciones tecnológicas de vanguardia.',
    images: ['https://www.onesecurity.com.ec/wp-content/uploads/2021/01/logox11.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
