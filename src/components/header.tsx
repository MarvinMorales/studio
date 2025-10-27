"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import Image from "next/image";
import { allProducts, websiteData, Product } from "@/lib/data";

const { header: headerData } = websiteData;
const navLinks = headerData.menu;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={headerData.logo} alt="Logo" width={150} height={40} className="object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.redirects} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <div ref={searchContainerRef} className="relative hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10 w-40 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isSearchFocused && searchQuery.length > 1 && (
              <div className="absolute top-full mt-2 w-full md:w-96 max-h-80 overflow-y-auto rounded-lg border bg-card shadow-lg z-10">
                {filteredProducts.length > 0 ? (
                  <div className="p-2">
                    {filteredProducts.map(product => (
                      <Link
                        key={product.id}
                        href={`/category/${product.category}?product=${product.id}`}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-muted"
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                      >
                        <Image src={product.images[0]} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                        <span className="text-sm font-medium">{product.name}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-sm text-center text-muted-foreground">No se encontraron productos.</p>
                )}
              </div>
            )}
          </div>
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
                     <Image src={headerData.logo} alt="Logo" width={120} height={30} className="object-contain" />
                  </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.redirects}
                        className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
