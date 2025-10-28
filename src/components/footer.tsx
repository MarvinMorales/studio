import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { websiteData, categoriesData } from '@/lib/data';
import Image from 'next/image';

export default function Footer() {
  const { businessInformation } = websiteData;

  if (!businessInformation) {
    return null;
  }

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Política de Privacidad', href: '/privacy-policy' },
    { name: 'Términos y Condiciones', href: '/terms-conditions' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="https://retailpointecuador.com/wp-content/uploads/2024/02/Recurso-3@3x.png" 
                alt="Retail Point Logo" 
                width={150} 
                height={40} 
                className="object-contain filter brightness-0 invert" 
              />
            </Link>
            <p className="text-sm">
              Soluciones completas para retail y puntos de venta. Ofrecemos tecnología de punta para optimizar su negocio.
            </p>
            <div className="flex space-x-2">
              <a href={businessInformation.socialMedia.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-primary/80 hover:bg-primary text-white p-2 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={businessInformation.socialMedia.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="bg-primary/80 hover:bg-primary text-white p-2 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center text-sm hover:text-white transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-white mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categoriesData.map(category => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`} className="flex items-center text-sm hover:text-white transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                <span>{businessInformation.address}</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <a href={`tel:${businessInformation.whatsappNumber}`} className="hover:text-white transition-colors">{businessInformation.whatsappNumber}</a>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <a href={`mailto:${businessInformation.contactEmail}`} className="hover:text-white transition-colors">{businessInformation.contactEmail}</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-8 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} RetailPoint Ecuador. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-400 mt-2 sm:mt-0">
            Diseñado con <span className="text-red-500">♥</span> en Ecuador
          </p>
        </div>
      </div>
    </footer>
  );
}

    