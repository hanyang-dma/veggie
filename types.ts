export type Language = 'en' | 'zh';

export interface Vegetable {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  icon: string; // Emoji
  imageUrl: string; // Direct URL to ensure loading
}

export interface SubCategory {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  items: Vegetable[];
}

export interface Category {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  subCategories: SubCategory[];
}

export interface AIVeggieDetails {
  funFact: string;
  nutrition: string;
  cookingTip: string;
}