import type { Product } from '../types/product';

const DEFAULT_SIZES = ['48–20', '50–21', '52–22'];

/** Single source of truth for product data (cards, Quick View, search, cart). */
export const products: Product[] = [
  {
    id: 'eclisse',
    no: '014',
    name: 'Eclisse',
    category: 'Acetate Sunglasses',
    price: 385,
    colors: ['#1A1916', '#751F2B', '#C3A056'],
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    ],
    tag: 'Bestseller',
    type: 'sun',
    sizes: DEFAULT_SIZES,
    description:
      'A sculptural acetate silhouette cut from a single block and polished across seven days. Deep bordeaux temples, gold-pin hinges.',
  },
  {
    id: 'marina',
    no: '027',
    name: 'Marina',
    category: 'Titanium Optical',
    price: 420,
    colors: ['#C3A056', '#1A1916'],
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80',
    tag: 'New',
    type: 'optical',
    sizes: DEFAULT_SIZES,
    description:
      'Feather-light Japanese titanium optical frame with adjustable temple tips and Carl Zeiss-ready lenses.',
  },
  {
    id: 'solea',
    no: '032',
    name: 'Soléa',
    category: 'Honey Acetate',
    price: 340,
    colors: ['#D5BC89', '#C3A056'],
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80',
    type: 'sun',
    sizes: DEFAULT_SIZES,
    description:
      'Honey acetate that catches light like polished amber. A softly rounded shape made to flatter.',
  },
  {
    id: 'nocturne',
    no: '041',
    name: 'Nocturne',
    category: 'Limited · 120',
    price: 520,
    colors: ['#0E0D0B', '#751F2B'],
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80',
    tag: 'Limited',
    type: 'limited',
    sizes: DEFAULT_SIZES,
    description:
      'Architectural obsidian frame, limited to 120 numbered pieces. Bordeaux interior signature.',
  },
  {
    id: 'cala-blanca',
    no: '045',
    name: 'Cala Blanca',
    category: 'Optical · Cream',
    price: 365,
    colors: ['#F6F2EA', '#C3A056'],
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    type: 'optical',
    sizes: DEFAULT_SIZES,
    description:
      'A pale, quiet optical frame in cream acetate with gold rivets. Understated by design.',
  },
  {
    id: 'tramonto',
    no: '049',
    name: 'Tramonto',
    category: 'Tortoise Acetate',
    price: 395,
    colors: ['#7d5a37', '#C3A056', '#1A1916'],
    image: 'https://images.unsplash.com/photo-1612479112139-c0f3e1ea3f06?auto=format&fit=crop&w=900&q=80',
    tag: 'Bestseller',
    type: 'sun',
    sizes: DEFAULT_SIZES,
    description:
      'Classic tortoise acetate, hand-marbled so no two pairs share a pattern.',
  },
  {
    id: 'brera',
    no: '052',
    name: 'Brera',
    category: 'Titanium Optical',
    price: 450,
    colors: ['#1A1916', '#C3A056'],
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80',
    type: 'optical',
    sizes: DEFAULT_SIZES,
    description:
      'A precise rectangular titanium optical frame for an architectural, editorial look.',
  },
  {
    id: 'costa',
    no: '058',
    name: 'Costa',
    category: 'Limited · 80',
    price: 580,
    colors: ['#C3A056', '#0E0D0B'],
    image: 'https://images.unsplash.com/photo-1556015048-4d3aa10df74c?auto=format&fit=crop&w=900&q=80',
    tag: 'Limited',
    type: 'limited',
    sizes: DEFAULT_SIZES,
    description:
      'The crown of the collection — 80 numbered pieces in gold-flecked acetate.',
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
