import data from './data.json';

export type MenuItem = {
  id: string;
  name: string;
  redirects: string;
};

export type HeroSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  showInfo: boolean;
  link: string;
};

export type WhyChooseUsCard = {
  title: string;
  subtitle: string;
};

export type TechServiceSection = {
  showThisSection: boolean;
  backgroundImage: string;
  title: string;
  subtitle: string;
  button: string;
};

export type SubCategory = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tags: string[];
  categoryPageBanner: {
    coverImage: string;
    title: string;
    subtitle: string;
  };
  subCategory: SubCategory[] | null;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tags: string[];
  categoryPageBanner: {
    coverImage: string;
    title: string;
    subtitle: string;
  };
  subCategory: SubCategory[] | null;
};

export type Product = {
  id: string;
  category: string;
  rating: number;
  name: string;
  subtitle: string;
  description: string;
  stock: number;
  price: number;
  tags: string[];
  images: string[];
};

export type InstagramPost = {
  id: number;
  image: string;
  caption: string;
  redirection: string;
};

export type Client = {
  id: string;
  name: string;
  clientImage: string;
};

export type SuccessCase = {
    id: string;
    clientName: string;
    coverImage: string;
    images: string[];
    description: string;
};

export const websiteData = data.website;
export const categoriesData: Category[] = data.categories;
export const productsData: Product[] = data.allProducts;
export const instagramPostsData: InstagramPost[] = data.instagramLatestPosts;
export const clientsData: Client[] = data.ourClients;
export const successCasesData: SuccessCase[] = data.successCases;

function findCategoryRecursive(categories: (Category | SubCategory)[], slug: string): Category | SubCategory | null {
  for (const category of categories) {
    if (!category) continue;
    if (category.id === slug) {
      return category;
    }
    if (category.subCategory) {
      const found = findCategoryRecursive(category.subCategory, slug);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function getCategoryBySlug(slug: string) {
  return findCategoryRecursive(categoriesData, slug);
}

export function getProductsByCategoryId(categoryId: string) {
    return productsData.filter(product => product.category === categoryId);
}

export const allProducts: Product[] = data.allProducts;

    