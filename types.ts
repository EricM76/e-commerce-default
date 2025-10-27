export interface Review {
  id: number;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  description: string;
  reviews: Review[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}