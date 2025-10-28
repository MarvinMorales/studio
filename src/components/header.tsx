"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronRight, X } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SearchBar from "./search-bar";

const { header: headerData } = websiteData;
const navLinks = headerData.menu;

const SubMenu = ({
  subCategories,
  onLinkClick,
}: {
  subCategories: SubCategory[];
  onLinkClick: () => void;
}) => {
  if (!subCategories || subCategories.length === 0) return null;

  return (
    <ul className="pl-4 border-l border-gray-200">
      {subCategories.map((subCategory) => (
        <li key={subCategory.id}>
          {subCategory.subCategory && subCategory.subCategory.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={subCategory.id} className="border-b-0">
                <div className="flex items-center justify-between hover:bg-accent rounded-md">
                  <AccordionTrigger className="py-2 px-3 flex-1 text-left text-sm font-medium hover:no-underline [&[data-state=open]>svg]:rotate-90">
                    {subCategory.name}
                  </AccordionTrigger>
                </div>
                <AccordionContent className="pb-0">
                  <SubMenu
                    subCategories={subCategory.subCategory}
                    onLinkClick={onLinkClick}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              href={`/category/${subCategory.id}`}
              className="block py-2 px-3 text-sm font-medium hover:bg-accent rounded-md"
              onClick={onLinkClick}
            >
              {subCategory.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const DesktopSubMenuItem = ({ item }: { item: Category | SubCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories = item.subCategory && item.subCategory.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasSubcategories) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  const itemContent = (
      <div
        className="flex items-center justify-between text-sm p-3 hover:bg-accent rounded-md"
      >
        <span
          className={cn(
            "flex-1",
            hasSubcategories && "cursor-pointer"
          )}
        >
          {item.name}
        </span>
        {hasSubcategories && (
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
        )}
      </div>
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {hasSubcategories ? (
            <div onClick={handleToggle}>{itemContent}</div>
        ) : (
            <Link href={`/category/${item.id}`} passHref asChild>
                <NavigationMenuLink className="w-full justify-start font-normal">
                    {itemContent}
                </NavigationMenuLink>
            </Link>
        )}
        {hasSubcategories && (
            <CollapsibleContent>
            <div className="pl-4 border-l">
                {item.subCategory?.map((subItem) => (
                <DesktopSubMenuItem key={subItem.id} item={subItem} />
                ))}
            </div>
            </CollapsibleContent>
        )}
    </Collapsible>
  );
};

const renderDesktopSubMenu = (items: (Category | SubCategory)[]) => {
  return (
    <NavigationMenuContent>
      <div className="w-[280px] p-2">
        {items.map((item) => (
          <DesktopSubMenuItem key={item.id} item={item} />
        ))}
      </div>
    </NavigationMenuContent>
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

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={headerData.logo}
            alt="Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
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
                    <NavigationMenuLink href={link.redirects} className={navigationMenuTriggerStyle()}>
                        {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={handleMobileLinkClick}
                  >
                    <Image
                      src={headerData.logo}
                      alt="Logo"
                      width={120}
                      height={30}
                      className="object-contain"
                    />
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                   </Button>
                </div>
                <div className="mb-6">
                    <SearchBar onResultClick={handleMobileLinkClick} />
                </div>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    if (link.name === "Soluciones Integrales") {
                      return (
                        <Accordion
                          key={link.id}
                          type="single"
                          collapsible
                          className="w-full"
                        >
                          <AccordionItem value="soluciones" className="border-b-0">
                            <AccordionTrigger className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors hover:no-underline py-2">
                              {link.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="pl-4 border-l border-gray-200">
                                {categoriesData.map((category) => (
                                  <li key={category.id}>
                                    {category.subCategory &&
                                    category.subCategory.length > 0 ? (
                                      <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                      >
                                        <AccordionItem
                                          value={category.id}
                                          className="border-b-0"
                                        >
                                          <div className="flex items-center justify-between hover:bg-accent rounded-md">
                                            <AccordionTrigger className="py-2 px-3 flex-1 text-left text-sm font-medium hover:no-underline [&[data-state=open]>svg]:rotate-90">
                                              {category.name}
                                            </AccordionTrigger>
                                          </div>
                                          <AccordionContent className="pb-0">
                                            <SubMenu
                                              subCategories={
                                                category.subCategory
                                              }
                                              onLinkClick={
                                                handleMobileLinkClick
                                              }
                                            />
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    ) : (
                                      <Link
                                        href={`/category/${category.id}`}
                                        className="block py-2 px-3 text-sm font-medium hover:bg-accent rounded-md"
                                        onClick={handleMobileLinkClick}
                                      >
                                        {category.name}
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
                        onClick={handleMobileLinkClick}
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
    </header>
  );
}
