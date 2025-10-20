import React from 'react';
import { CaseCard } from './CaseCard';

interface Case {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CaseGridProps {
  cases: Case[];
}

export const CaseGrid: React.FC<CaseGridProps> = ({ cases }) => (
  <div className="grid">
    {cases.map(c => <CaseCard key={c.id} {...c} />)}
  </div>
);
