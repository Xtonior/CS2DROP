import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';
import { CSCase, CSItem } from '../types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ItemCard } from './ItemCard';

interface CaseOpeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: CSCase | null;
  onItemReceived: (item: CSItem) => void;
  userBalance: number;
  onBalanceChange: (newBalance: number) => void;
}

export function CaseOpeningModal({ 
  isOpen, 
  onClose, 
  case: caseData, 
  onItemReceived,
  userBalance,
  onBalanceChange 
}: CaseOpeningModalProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<CSItem | null>(null);
  const [animationStage, setAnimationStage] = useState<'idle' | 'spinning' | 'revealing' | 'complete'>('idle');

  const getRandomItem = (items: CSItem[]): CSItem => {
    // Weighted random based on rarity (lower rarity = higher chance)
    const weights = items.map(item => {
      switch (item.rarity) {
        case 'common': return 40;
        case 'uncommon': return 30;
        case 'rare': return 20;
        case 'epic': return 7;
        case 'legendary': return 2.5;
        case 'exotic': return 0.5;
        default: return 20;
      }
    });
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }
    
    return items[0];
  };

  const openCase = () => {
    if (!caseData || userBalance < caseData.price) return;
    
    setIsOpening(true);
    setAnimationStage('spinning');
    onBalanceChange(userBalance - caseData.price);
    
    // Simulate case opening animation
    setTimeout(() => {
      const item = getRandomItem(caseData.items);
      setWonItem(item);
      setAnimationStage('revealing');
      
      setTimeout(() => {
        setAnimationStage('complete');
        onItemReceived(item);
      }, 1500);
    }, 3000);
  };

  const resetModal = () => {
    setIsOpening(false);
    setWonItem(null);
    setAnimationStage('idle');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!caseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
        <DialogTitle className="sr-only">{caseData.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Open {caseData.name} case to receive random CS2 items
        </DialogDescription>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{caseData.name}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center">
          {animationStage === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-48 h-48 mx-auto">
                <img
                  src={caseData.image}
                  alt={caseData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">{caseData.description}</p>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-green-400 font-bold text-lg">${caseData.price.toFixed(2)}</span>
                  <Button
                    onClick={openCase}
                    disabled={userBalance < caseData.price}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                  >
                    {userBalance < caseData.price ? 'Insufficient Balance' : 'Open Case'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {animationStage === 'spinning' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 mx-auto"
              >
                <img
                  src={caseData.image}
                  alt={caseData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
              <p className="text-white text-lg">Opening case...</p>
            </motion.div>
          )}

          {animationStage === 'revealing' && wonItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="space-y-6"
            >
              <div className="w-64 mx-auto">
                <ItemCard item={wonItem} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-green-400 font-bold text-xl">Congratulations!</p>
                <p className="text-gray-300">You won: {wonItem.name}</p>
              </motion.div>
            </motion.div>
          )}

          {animationStage === 'complete' && wonItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="w-64 mx-auto">
                <ItemCard item={wonItem} />
              </div>
              <div className="space-y-4">
                <p className="text-green-400 font-bold text-xl">Item Added to Inventory!</p>
                <p className="text-gray-300">{wonItem.name} - ${wonItem.value.toFixed(2)}</p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Open Another
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="text-white border-gray-600 hover:bg-gray-800"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}