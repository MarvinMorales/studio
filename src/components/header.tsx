"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { websiteData, categoriesData, Category, SubCategory } from "@/lib/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const { header: headerData } = websiteData;
const navLinks = headerData.menu;

const SubMenu = ({ subCategories }: { subCategories: SubCategory[] }) => {
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <ul className="pl-4 border-l border-gray-200">
      {subCategories.map((subCategory) => (
        <li key={subCategory.id}>
          {subCategory.subCategory && subCategory.subCategory.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={subCategory.id} className="border-b-0">
                <div className="flex items-center justify-between hover:bg-accent rounded-md">
                  <Link href={`/category/${subCategory.id}`} legacyBehavior passHref>
                    <a className="flex-1 py-2 px-3 text-sm font-medium">
                      {subCategory.name}
                    </a>
                  </Link>
                  <AccordionTrigger className="py-2 px-3 [&[data-state=open]>svg]:rotate-90 w-auto">
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                </div>
                <AccordionContent className="pb-0">
                  <SubMenu subCategories={subCategory.subCategory} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link href={`/category/${subCategory.id}`} legacyBehavior passHref>
              <a className="block py-2 px-3 text-sm font-medium hover:bg-accent rounded-md">
                {subCategory.name}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderDesktopSubMenu = (items: (Category | SubCategory)[]) => {
    return (
      <NavigationMenuContent>
        <ul className="w-[280px] p-2">
          {items.map((item) => (
            <li key={item.id}>
              {item.subCategory && item.subCategory.length > 0 ? (
                <NavigationMenu>
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-between !bg-transparent hover:!bg-accent focus:!bg-accent !font-normal">
                      <Link href={`/category/${item.id}`} legacyBehavior passHref>
                        <a className="text-sm">{item.name}</a>
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="left-[265px] top-[-10px]">
                      <ul className="w-[280px] p-2">
                        {item.subCategory.map((subItem) => (
                          <li key={subItem.id}>
                             {subItem.subCategory && subItem.subCategory.length > 0 ? (
                                <NavigationMenu>
                                    <NavigationMenuItem className="w-full">
                                        <NavigationMenuTrigger className="w-full justify-between !bg-transparent hover:!bg-accent focus:!bg-accent !font-normal">
                                            <Link href={`/category/${subItem.id}`} legacyBehavior passHref>
                                                <a className="text-sm">{subItem.name}</a>
                                            </Link>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="left-[265px] top-[-10px]">
                                             <ul className="w-[280px] p-2">
                                                {subItem.subCategory.map((subSubItem) => (
                                                    <ListItem key={subSubItem.id} href={`/category/${subSubItem.id}`} title={subSubItem.name} />
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenu>
                             ) : (
                                <ListItem href={`/category/${subItem.id}`} title={subItem.name} />
                             )}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenu>
              ) : (
                <ListItem href={`/category/${item.id}`} title={item.name} />
              )}
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    );
  };
  

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={headerData.logo} alt="Logo" width={150} height={40} className="object-contain" />
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => {
              if (link.name === "Soluciones Integrales") {
                return (
                  <NavigationMenuItem key={link.id}>
                    <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                    {renderDesktopSubMenu(categoriesData)}
                  </NavigationMenuItem>
                );
              }
              return (
                 <NavigationMenuItem key={link.id}>
                    <Link href={link.redirects} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {link.name}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-2">
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
                  <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                     <Image src={headerData.logo} alt="Logo" width={120} height={30} className="object-contain" />
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      if (link.name === "Soluciones Integrales") {
                        return (
                          <Accordion key={link.id} type="single" collapsible className="w-full">
                            <AccordionItem value="soluciones" className="border-b-0">
                              <AccordionTrigger className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors hover:no-underline py-2">
                                {link.name}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="pl-4 border-l border-gray-200">
                                  {categoriesData.map((category) => (
                                    <li key={category.id}>
                                      {category.subCategory && category.subCategory.length > 0 ? (
                                        <Accordion type="single" collapsible className="w-full">
                                          <AccordionItem value={category.id} className="border-b-0">
                                            <div className="flex items-center justify-between hover:bg-accent rounded-md">
                                                <Link href={`/category/${category.id}`} legacyBehavior passHref>
                                                    <a className="flex-1 py-2 px-3 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                                                        {category.name}
                                                    </a>
                                                </Link>
                                                <AccordionTrigger className="py-2 px-3 [&[data-state=open]>svg]:rotate-90 w-auto">
                                                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                                                </AccordionTrigger>
                                            </div>
                                            <AccordionContent className="pb-0">
                                              <SubMenu subCategories={category.subCategory} />
                                            </AccordionContent>
                                          </AccordionItem>
                                        </Accordion>
                                      ) : (
                                        <Link href={`/category/${category.id}`} legacyBehavior passHref>
                                            <a className="block py-2 px-3 text-sm font-medium hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                                                {category.name}
                                            </a>
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }
                      return (
                        <Link
                          key={link.id}
                          href={link.redirects}
                          className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
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


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
