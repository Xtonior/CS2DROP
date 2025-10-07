import { useState } from 'react';
import { Header } from './components/Header';
import { CaseCard } from './components/CaseCard';
import { CaseOpeningModal } from './components/CaseOpeningModal';
import { InventoryModal } from './components/InventoryModal';
import { mockCases } from './data/mock-data';
import { CSCase, CSItem } from './types';

export default function App() {
  const [userBalance, setUserBalance] = useState(1000);
  const [inventory, setInventory] = useState<CSItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<CSCase | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const handleCaseOpen = (caseData: CSCase) => {
    setSelectedCase(caseData);
    setIsCaseModalOpen(true);
  };

  const handleItemReceived = (item: CSItem) => {
    setInventory(prev => [...prev, item]);
  };

  const handleBalanceChange = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header 
        balance={userBalance} 
        onInventoryClick={() => setIsInventoryModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Open CS2 Cases
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Unbox rare skins and items from Counter-Strike 2
          </p>
          <div className="inline-flex items-center bg-gray-800 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-green-400 font-medium">Live Case Opening</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Cases Opened Today</h3>
            <p className="text-3xl font-bold text-white">12,847</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Items Unboxed</h3>
            <p className="text-3xl font-bold text-white">45,231</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-green-400">$2,847,291</p>
          </div>
        </div>

        {/* Cases Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Available Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCases.map((caseData) => (
              <CaseCard
                key={caseData.id}
                case={caseData}
                onOpen={handleCaseOpen}
                disabled={userBalance < caseData.price}
              />
            ))}
          </div>
        </div>

        {/* Recent Drops Section */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Drops</h3>
          <div className="space-y-3">
            {[
              { user: 'Player123', item: 'AK-47 | Fire Serpent', value: '$450.99', rarity: 'legendary' },
              { user: 'GamerPro', item: 'Karambit | Doppler', value: '$800.25', rarity: 'exotic' },
              { user: 'CaseOpener', item: 'AWP | Dragon Lore', value: '$2500.00', rarity: 'exotic' },
              { user: 'LuckyUser', item: 'M4A4 | Howl', value: '$1200.50', rarity: 'legendary' },
            ].map((drop, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">{drop.user}</span>
                  <span className="text-white">unboxed</span>
                  <span className={`font-medium ${
                    drop.rarity === 'exotic' ? 'text-red-400' : 
                    drop.rarity === 'legendary' ? 'text-orange-400' : 'text-blue-400'
                  }`}>
                    {drop.item}
                  </span>
                </div>
                <span className="text-green-400 font-medium">{drop.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <CaseOpeningModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        case={selectedCase}
        onItemReceived={handleItemReceived}
        userBalance={userBalance}
        onBalanceChange={handleBalanceChange}
      />

      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        inventory={inventory}
        balance={userBalance}
      />
    </div>
  );
}