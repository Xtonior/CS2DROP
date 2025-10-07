import { CSCase, CSItem } from '../types';

export const mockItems: CSItem[] = [
  {
    id: '1',
    name: 'AK-47 | Fire Serpent',
    type: 'Rifle',
    rarity: 'legendary',
    value: 450.99,
    image: 'https://images.unsplash.com/photo-1730578725185-3810188ecf8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBza2lucyUyMHdlYXBvbnN8ZW58MXx8fHwxNzU5ODEzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Field-Tested'
  },
  {
    id: '2',
    name: 'AWP | Dragon Lore',
    type: 'Sniper Rifle',
    rarity: 'exotic',
    value: 2500.00,
    image: 'https://images.unsplash.com/photo-1636489879543-df66325b8fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtZXxlbnwxfHx8fDE3NTk4MTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Factory New'
  },
  {
    id: '3',
    name: 'M4A4 | Howl',
    type: 'Rifle',
    rarity: 'legendary',
    value: 1200.50,
    image: 'https://images.unsplash.com/photo-1730578725185-3810188ecf8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBza2lucyUyMHdlYXBvbnN8ZW58MXx8fHwxNzU5ODEzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Minimal Wear'
  },
  {
    id: '4',
    name: 'Glock-18 | Fade',
    type: 'Pistol',
    rarity: 'epic',
    value: 125.75,
    image: 'https://images.unsplash.com/photo-1636489879543-df66325b8fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtZXxlbnwxfHx8fDE3NTk4MTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Factory New'
  },
  {
    id: '5',
    name: 'Karambit | Doppler',
    type: 'Knife',
    rarity: 'exotic',
    value: 800.25,
    image: 'https://images.unsplash.com/photo-1730578725185-3810188ecf8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBza2lucyUyMHdlYXBvbnN8ZW58MXx8fHwxNzU5ODEzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Factory New'
  },
  {
    id: '6',
    name: 'P90 | Death by Kitty',
    type: 'SMG',
    rarity: 'rare',
    value: 45.99,
    image: 'https://images.unsplash.com/photo-1636489879543-df66325b8fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtZXxlbnwxfHx8fDE3NTk4MTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Minimal Wear'
  },
  {
    id: '7',
    name: 'MAC-10 | Neon Rider',
    type: 'SMG',
    rarity: 'uncommon',
    value: 12.50,
    image: 'https://images.unsplash.com/photo-1730578725185-3810188ecf8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBza2lucyUyMHdlYXBvbnN8ZW58MXx8fHwxNzU5ODEzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Field-Tested'
  },
  {
    id: '8',
    name: 'USP-S | Kill Confirmed',
    type: 'Pistol',
    rarity: 'epic',
    value: 67.99,
    image: 'https://images.unsplash.com/photo-1636489879543-df66325b8fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtZXxlbnwxfHx8fDE3NTk4MTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    condition: 'Factory New'
  }
];

export const mockCases: CSCase[] = [
  {
    id: 'case1',
    name: 'Spectrum Case',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1749842839797-dc913972953d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVhc3VyZSUyMGNoZXN0JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTk4MTMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Contains community-designed weapon finishes.',
    items: [mockItems[0], mockItems[3], mockItems[6], mockItems[7]]
  },
  {
    id: 'case2',
    name: 'Horizon Case',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1749842839797-dc913972953d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVhc3VyZSUyMGNoZXN0JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTk4MTMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Featuring skins inspired by ancient civilizations.',
    items: [mockItems[1], mockItems[2], mockItems[4], mockItems[5]]
  },
  {
    id: 'case3',
    name: 'Chroma Case',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1749842839797-dc913972953d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVhc3VyZSUyMGNoZXN0JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTk4MTMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Colorful weapon skins with vibrant designs.',
    items: [mockItems[3], mockItems[5], mockItems[6], mockItems[7]]
  },
  {
    id: 'case4',
    name: 'Operation Case',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1749842839797-dc913972953d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVhc3VyZSUyMGNoZXN0JTIwb3BlbmluZ3xlbnwxfHx8fDE3NTk4MTMyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Exclusive items from special operations.',
    items: [mockItems[0], mockItems[1], mockItems[2], mockItems[4]]
  }
];