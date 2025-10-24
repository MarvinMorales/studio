import Link from 'next/link';
import { Camera, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Camera className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-foreground">OneSecurity Vision</span>
            </Link>
            <p className="text-muted-foreground text-sm">Soluciones integrales de seguridad tecnológica para un mundo más seguro.</p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-foreground">Productos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cámaras IP</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cámaras de Seguridad</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Servidores</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Lectores RFID</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-foreground">Navegación</h4>
            <ul className="space-y-2">
              <li><Link href="#categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categorías</Link></li>
              <li><Link href="#news" className="text-sm text-muted-foreground hover:text-primary transition-colors">Novedades</Link></li>
              <li><Link href="#success-stories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Casos de Éxito</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4 text-foreground">Síguenos</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></a>
              </Button>
               <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} OneSecurity Vision. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
