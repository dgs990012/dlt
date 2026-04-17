export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  imageUrl: string;
  linkUrl: string;
  badge?: string;
  rating?: number;
  downloads?: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  accentColor: string;
}
