"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#categories", label: "Categorías" },
  { href: "#news", label: "Novedades" },
  { href: "#video", label: "Video" },
  { href: "#success-stories", label: "Casos de Éxito" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Camera className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">OneSecurity</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden sm:flex">Contacto</Button>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col p-6">
                  <Link href="/" className="flex items-center gap-2 mb-8">
                    <Camera className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold font-headline">OneSecurity</span>
                  </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                   <Button className="mt-8">Contacto</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
