import { Bouquet } from '../types/bouquet';

const bouquets: Bouquet[] = [
  {
    id: "b1",
    name: "Sunny Delight",
    description: "A vibrant mix of sunflowers, yellow roses, and daisies to brighten any day.",
    image: "https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 59.99,
    discountedPrice: 49.99,
    rating: 4.8,
    tags: ["Sunflowers", "Cheerful", "Bright"],
    isNew: false,
    isBestseller: true
  },
  {
    id: "b2",
    name: "Rose Romance",
    description: "Classic arrangement of premium red roses, perfect for expressing love and affection.",
    image: "https://images.pexels.com/photos/931176/pexels-photo-931176.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 69.99,
    discountedPrice: null,
    rating: 5.0,
    tags: ["Roses", "Romantic", "Classic"],
    isNew: false,
    isBestseller: true
  },
  {
    id: "b3",
    name: "Lavender Dreams",
    description: "Soothing bouquet of lavender, purple roses, and lilacs with eucalyptus accents.",
    image: "https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 64.99,
    discountedPrice: 54.99,
    rating: 4.7,
    tags: ["Lavender", "Purple", "Elegant"],
    isNew: true,
    isBestseller: false
  },
  {
    id: "b4",
    name: "Rustic Wildflower",
    description: "Natural arrangement of seasonal wildflowers in a rustic style with leafy greens.",
    image: "https://images.pexels.com/photos/1586296/pexels-photo-1586296.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 49.99,
    discountedPrice: null,
    rating: 4.5,
    tags: ["Wildflowers", "Rustic", "Natural"],
    isNew: false,
    isBestseller: false
  },
  {
    id: "b5",
    name: "Pink Perfection",
    description: "Delicate arrangement of pink roses, peonies, and carnations in a medium bouquet.",
    image: "https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 59.99,
    discountedPrice: null,
    rating: 4.9,
    tags: ["Pink", "Peonies", "Soft"],
    isNew: false,
    isBestseller: true
  },
  {
    id: "b6",
    name: "Tropical Paradise",
    description: "Exotic birds of paradise, orchids, and tropical greens in a vibrant display.",
    image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 79.99,
    discountedPrice: 69.99,
    rating: 4.6,
    tags: ["Tropical", "Exotic", "Colorful"],
    isNew: true,
    isBestseller: false
  },
  {
    id: "b7",
    name: "White Elegance",
    description: "Pure white roses, lilies, and hydrangeas for a sophisticated and timeless look.",
    image: "https://images.pexels.com/photos/3699859/pexels-photo-3699859.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 69.99,
    discountedPrice: null,
    rating: 4.8,
    tags: ["White", "Elegant", "Sophisticated"],
    isNew: false,
    isBestseller: false
  },
  {
    id: "b8",
    name: "Autumn Harvest",
    description: "Warm orange and red blooms with seasonal fall accents and textures.",
    image: "https://images.pexels.com/photos/5808875/pexels-photo-5808875.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 54.99,
    discountedPrice: 49.99,
    rating: 4.7,
    tags: ["Autumn", "Orange", "Seasonal"],
    isNew: false,
    isBestseller: false
  },
  {
    id: "b9",
    name: "Sweet Pastels",
    description: "Soft pastel mix of roses, lisianthus, and ranunculus for a gentle and romantic feel.",
    image: "https://images.pexels.com/photos/5657788/pexels-photo-5657788.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 59.99,
    discountedPrice: null,
    rating: 4.9,
    tags: ["Pastel", "Soft", "Sweet"],
    isNew: true,
    isBestseller: false
  },
  {
    id: "b10",
    name: "Bold & Beautiful",
    description: "Striking arrangement of red and purple blooms with dramatic greenery.",
    image: "https://images.pexels.com/photos/1261016/pexels-photo-1261016.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 74.99,
    discountedPrice: 64.99,
    rating: 4.8,
    tags: ["Bold", "Dramatic", "Colorful"],
    isNew: false,
    isBestseller: true
  },
  {
    id: "b11",
    name: "Petite Posy",
    description: "Small, delicate arrangement perfect for desks or small spaces.",
    image: "https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 34.99,
    discountedPrice: null,
    rating: 4.5,
    tags: ["Small", "Cute", "Affordable"],
    isNew: false,
    isBestseller: false
  },
  {
    id: "b12",
    name: "Luxury Collection",
    description: "Premium roses, peonies, and exotic blooms in an opulent arrangement.",
    image: "https://images.pexels.com/photos/1070860/pexels-photo-1070860.jpeg?auto=compress&cs=tinysrgb&w=1600",
    price: 119.99,
    discountedPrice: 99.99,
    rating: 5.0,
    tags: ["Luxury", "Premium", "Special"],
    isNew: false,
    isBestseller: false
  }
];

export default bouquets;