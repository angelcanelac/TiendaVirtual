// Productos

import type { User } from "./User";
export interface Product {
  id: number;
  uuid?: string;
  name: string;
  resumen: string;
  description: string;
  sku: string;
  nmp: string;
  width: string;
  height: string;
  weight: string;
  lenght: string;
  depth: string;
  price: string | number;
  make_offer: number;
  user: User;
  brands: null;
  offers: null;
  categories: string[];
  colors: string[];
  image: Image;
  images: Image[];
  stock: number;
  status: number;
  cart: number;
  favorite: number;
}

export interface Image {
  id: number;
  uuid: string;
  type: string;
  name: string;
  url: string;
  fileable_type: string;
  fileable_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  path: string;
}

export interface Category {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  status: number;
  image: string;
  created_at: null;
  updated_at: null;
}
