import { motion } from 'motion/react';
import { CSCase } from '../types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseCardProps {
  case: CSCase;
  onOpen: (caseData: CSCase) => void;
  disabled?: boolean;
}

export function CaseCard({ case: caseData, onOpen, disabled }: CaseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-gray-600 transition-colors">
        <div className="aspect-square relative overflow-hidden">
          <ImageWithFallback
            src={caseData.image}
            alt={caseData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2">{caseData.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{caseData.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-green-400 font-bold">${caseData.price.toFixed(2)}</span>
            <Button
              onClick={() => onOpen(caseData)}
              disabled={disabled}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Open Case
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}