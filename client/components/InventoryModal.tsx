import { X, Package, DollarSign } from 'lucide-react';
import { CSItem } from '../types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ItemCard } from './ItemCard';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: CSItem[];
  balance: number;
}

export function InventoryModal({ isOpen, onClose, inventory, balance }: InventoryModalProps) {
  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  
  const groupedByType = inventory.reduce((groups, item) => {
    const type = item.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {} as Record<string, CSItem[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh]">
        <DialogTitle className="sr-only">Inventory</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your CS2 items and inventory statistics
        </DialogDescription>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Inventory</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <Package className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Total Items</p>
            <p className="text-lg font-bold text-white">{inventory.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Total Value</p>
            <p className="text-lg font-bold text-green-400">${totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-lg font-bold text-blue-400">${balance.toFixed(2)}</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-gray-700">All</TabsTrigger>
            <TabsTrigger value="Rifle" className="text-white data-[state=active]:bg-gray-700">Rifles</TabsTrigger>
            <TabsTrigger value="Pistol" className="text-white data-[state=active]:bg-gray-700">Pistols</TabsTrigger>
            <TabsTrigger value="Knife" className="text-white data-[state=active]:bg-gray-700">Knives</TabsTrigger>
            <TabsTrigger value="SMG" className="text-white data-[state=active]:bg-gray-700">SMGs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
              {inventory.map((item, index) => (
                <ItemCard key={`${item.id}-${index}`} item={item} />
              ))}
            </div>
            {inventory.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Your inventory is empty</p>
                <p className="text-gray-500 text-sm">Open some cases to get started!</p>
              </div>
            )}
          </TabsContent>
          
          {Object.entries(groupedByType).map(([type, items]) => (
            <TabsContent key={type} value={type} className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <ItemCard key={`${item.id}-${index}`} item={item} />
                ))}
              </div>
              {items.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No {type.toLowerCase()}s in inventory</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}