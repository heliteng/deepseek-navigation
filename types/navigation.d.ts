export type Tag = '免费' | '收费' | '官方' | '免注册' | '需要注册' | '满血版';

export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  iconBgColor?: string;
  description: string;
  category: string;
  tags: Tag[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  items: NavItem[];
}

export interface Navigation {
  categories: Category[];
} 