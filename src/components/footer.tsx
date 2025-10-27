import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { websiteData } from '@/lib/data';
import Image from 'next/image';

const { header, businessInformation } = websiteData;

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src={header.logo} alt="Logo" width={150} height={40} className="object-contain filter invert brightness-0" />
            </Link>
            <p className="text-gray-400 text-sm">{businessInformation.address}</p>
            <p className="text-gray-400 text-sm mt-2">{businessInformation.businessHours}</p>
            <p className="text-gray-400 text-sm mt-2">
              <a href={`mailto:${businessInformation.contactEmail}`} className="hover:text-primary">{businessInformation.contactEmail}</a>
            </p>
             <p className="text-gray-400 text-sm mt-2">
              <a href={`https://wa.me/${businessInformation.whatsappNumber}`} target='_blank' rel='noopener noreferrer' className="hover:text-primary">+{businessInformation.whatsappNumber}</a>
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Soluciones</h4>
            <ul className="space-y-2">
              <li><Link href="/category/1" className="text-sm text-gray-400 hover:text-primary transition-colors">Sistemas Antihurto EAS</Link></li>
              <li><Link href="/category/2" className="text-sm text-gray-400 hover:text-primary transition-colors">Sistema ESL</Link></li>
              <li><Link href="/category/5" className="text-sm text-gray-400 hover:text-primary transition-colors">Sistema CCTV con IA</Link></li>
              <li><Link href="/category/6" className="text-sm text-gray-400 hover:text-primary transition-colors">Sistema RFID</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {header.menu.map(item => (
                 <li key={item.id}><Link href={item.redirects} className="text-sm text-gray-400 hover:text-primary transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href={businessInformation.socialMedia.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5 text-gray-400 hover:text-primary" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={businessInformation.socialMedia.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5 text-gray-400 hover:text-primary" /></a>
              </Button>
               <Button variant="ghost" size="icon" asChild>
                <a href={businessInformation.socialMedia.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5 text-gray-400 hover:text-primary" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 py-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Retail Point. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
