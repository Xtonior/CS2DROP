import { motion } from 'motion/react';
import { CSItem, RARITY_COLORS } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ItemCardProps {
  item: CSItem;
  showValue?: boolean;
  className?: string;
}

export function ItemCard({ item, showValue = true, className = '' }: ItemCardProps) {
  const rarityStyle = RARITY_COLORS[item.rarity];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={className}
    >
      <Card className={`bg-gray-800 border-2 ${rarityStyle.border} overflow-hidden hover:shadow-lg transition-shadow`}>
        <div className="aspect-square relative overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${rarityStyle.bg} opacity-10`} />
          <div className="absolute top-2 right-2">
            <Badge className={`${rarityStyle.bg} ${rarityStyle.text} border-0 text-xs`}>
              {item.rarity.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="p-3">
          <h4 className="text-white font-medium text-sm mb-1 truncate">{item.name}</h4>
          <p className="text-gray-400 text-xs mb-2">{item.type}</p>
          {item.condition && (
            <p className="text-gray-500 text-xs mb-2">{item.condition}</p>
          )}
          {showValue && (
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-semibold text-sm">${item.value.toFixed(2)}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}