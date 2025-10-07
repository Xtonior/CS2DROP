export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'exotic';

export interface CSItem {
  id: string;
  name: string;
  type: string;
  rarity: ItemRarity;
  value: number;
  image: string;
  condition?: string;
}

export interface CSCase {
  id: string;
  name: string;
  price: number;
  image: string;
  items: CSItem[];
  description: string;
}

export interface UserInventory {
  items: CSItem[];
  balance: number;
}

export const RARITY_COLORS: Record<ItemRarity, { bg: string; border: string; text: string }> = {
  common: { bg: 'bg-gray-600', border: 'border-gray-500', text: 'text-gray-300' },
  uncommon: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-300' },
  rare: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-300' },
  epic: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-300' },
  legendary: { bg: 'bg-orange-600', border: 'border-orange-500', text: 'text-orange-300' },
  exotic: { bg: 'bg-red-600', border: 'border-red-500', text: 'text-red-300' },
};