
'use client'

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

type AppData = {
    website: {
        header: {
            logo: string;
            menu: MenuItem[];
        };
        heroSection: {
            showThisSection: boolean;
            slides: HeroSlide[];
        };
        videoSection: {
            showThisSection: boolean;
            videoId: string;
            title: string;
            description: string;
        };
        fastCategoriesSection: {
            showThisSection: boolean;
            title: string;
        };
        successCasesSection: {
            showThisSection: boolean;
            title: string;
            subtitle: string;
        };
        businessInformation: {
            websiteDomain: string;
            whatsappNumber: string;
            contactEmail: string;
            address: string;
            businessHours: string;
            socialMedia: {
                facebook: string;
                instagram: string;
                youtube: string;
            };
        };
    };
    categories: Category[];
    allProducts: Product[];
    instagramLatestPosts: InstagramPost[];
    ourClients: Client[];
    successCases: SuccessCase[];
};


let cache: AppData | null = null;

async function fetchData(): Promise<AppData> {
    if (cache) {
        return cache;
    }
    const res = await fetch('/data.json');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: AppData = await res.json();
    cache = data;
    return data;
}


export async function getWebsiteData() {
    const data = await fetchData();
    return data.website;
}

export async function getCategoriesData() {
    const data = await fetchData();
    return data.categories;
}

export async function getProductsData() {
    const data = await fetchData();
    return data.allProducts;
}

export async function getInstagramPostsData() {
    const data = await fetchData();
    return data.instagramLatestPosts;
}

export async function getClientsData() {
    const data = await fetchData();
    return data.ourClients;
}

export async function getSuccessCasesData() {
    const data = await fetchData();
    return data.successCases;
}


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

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategoriesData();
  return findCategoryRecursive(categories, slug);
}

export async function getProductsByCategoryId(categoryId: string) {
    const products = await getProductsData();
    return products.filter(product => product.category === categoryId);
}

async function getProductsRecursive(category: Category | SubCategory): Promise<Product[]> {
  let products = await getProductsByCategoryId(category.id);
  if (category.subCategory) {
    for (const sub of category.subCategory) {
      const subProducts = await getProductsRecursive(sub);
      products = products.concat(subProducts);
    }
  }
  return products;
}

export async function getProductsForCategoryAndSubcategories(category: Category | SubCategory): Promise<Product[]> {
    return getProductsRecursive(category);
}


export function getAllCategories(categories: (Category | SubCategory)[]): (Category | SubCategory)[] {
    let all: (Category | SubCategory)[] = [];
    for (const category of categories) {
      all.push(category);
      if (category.subCategory) {
        all = all.concat(getAllCategories(category.subCategory));
      }
    }
    return all;
}

export async function searchProductsAndCategories(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    
    const allProducts = await getProductsData();
    const allCategories = await getCategoriesData();
    const allCategoriesList = getAllCategories(allCategories);

    const filteredCategories = allCategoriesList.filter(category =>
      category.name.toLowerCase().includes(lowerCaseQuery)
    );
  
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  
    return {
      categories: filteredCategories,
      products: filteredProducts,
    };
}
