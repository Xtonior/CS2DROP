import { Wallet, User, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  balance: number;
  onInventoryClick: () => void;
}

export function Header({ balance, onInventoryClick }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-white">CS2DROP</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Cases</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Battles</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Upgrade</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Marketplace</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
            <Wallet className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-white font-medium">${balance.toFixed(2)}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onInventoryClick}
            className="text-white border-gray-600 hover:bg-gray-800"
          >
            <User className="w-4 h-4 mr-2" />
            Inventory
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}