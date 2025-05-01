export interface Bouquet {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice: number | null;
  rating: number;
  tags: string[];
  isNew: boolean;
  isBestseller: boolean;
}