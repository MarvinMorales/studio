"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { searchProductsAndCategories, Category, Product, SubCategory } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type SearchResult = (Product | Category | SubCategory) & { type: 'product' | 'category' };

export default function SearchBar({ onResultClick }: { onResultClick?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = searchProductsAndCategories(query);
      const formattedResults: SearchResult[] = [
        ...searchResults.categories.map(c => ({ ...c, type: 'category' as const })),
        ...searchResults.products.map(p => ({ ...p, type: 'product' as const })),
      ];
      setResults(formattedResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'product') {
      router.push(`/category/${result.category}?product=${result.id}`);
    } else {
      router.push(`/category/${result.id}`);
    }
    setQuery("");
    setResults([]);
    setIsFocused(false);
    if (onResultClick) {
        onResultClick();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar productos o categorías..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-10"
        />
      </div>

      {isFocused && (query.length > 1 || results.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                    <li key={`${result.type}-${result.id}`} className="border-b last:border-b-0">
                        <div
                            onClick={() => handleResultClick(result)}
                            className="flex items-center gap-4 p-3 hover:bg-accent cursor-pointer"
                        >
                            <div className="relative h-12 w-12 flex-shrink-0">
                                <Image
                                    src={result.type === 'product' ? result.images[0] : (result as Category | SubCategory).coverImage}
                                    alt={result.name}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{result.name}</p>
                                <span className={cn(
                                    "text-xs font-medium px-2 py-0.5 rounded-full",
                                    result.type === 'product' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                )}>
                                    {result.type === 'product' ? 'Producto' : 'Categoría'}
                                </span>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
            ) : (
                query.length > 1 && <p className="p-4 text-sm text-muted-foreground">No se encontraron resultados.</p>
            )}
        </div>
      )}
    </div>
  );
}
