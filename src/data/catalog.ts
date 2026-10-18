import productsJson from './products.json';
import { campaigns, type Campaign } from './campaigns';

export type CategorySlug = 'gafas-de-sol' | 'screen-glasses' | 'clips';
export type ProductStatus = 'unknown' | 'available' | 'sold_out';
export type Product = {
  slug: string;
  title: string;
  category: CategorySlug;
  type: string;
  color: string;
  description: string;
  photoPrefixes: string[];
  photoIndexes?: number[];
  imageCount: number;
  status: ProductStatus;
  code?: string;
  price?: number;
};

export const products = productsJson as Product[];

export const categories: Record<CategorySlug, { label: string; eyebrow: string; intro: string; campaignIntro: string; note?: string; campaign: Campaign }> = {
  'gafas-de-sol': {
    label: 'Gafas de sol',
    eyebrow: 'La luz, a tu manera',
    intro: 'Siluetas que hacen del sol parte de tu expresión.',
    campaignIntro: 'La luz, a tu manera.',
    campaign: campaigns.sunglasses,
  },
  'screen-glasses': {
    label: 'Screen Glasses',
    eyebrow: 'Tu mirada cotidiana',
    intro: 'Armazones para elegir a tu manera. Lunas, tratamientos y filtros se consultan y cotizan aparte.',
    campaignIntro: 'Tu mirada cotidiana, con identidad propia.',
    note: 'Armazones; lunas y tratamientos se cotizan aparte.',
    campaign: campaigns.screen,
  },
  clips: {
    label: 'Clips',
    eyebrow: 'Más de una forma de mirar',
    intro: 'Monturas fotografiadas junto a su clip. Confirma configuración y disponibilidad antes de comprar.',
    campaignIntro: 'Más de una forma de mirar.',
    note: 'Consulta configuración y disponibilidad de cada modelo.',
    campaign: campaigns.clips,
  },
};

export const productUrl = (product: Product) => `/productos/${product.slug}/`;
export const categoryUrl = (category: CategorySlug) => `/colecciones/${category}/`;
export const imageUrl = (product: Product, index: number, width: 480 | 1200, format: 'webp' | 'avif') =>
  `/assets/catalog/${product.slug}/${String(index).padStart(2, '0')}-${width}.${format}`;
