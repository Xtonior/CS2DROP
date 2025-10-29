import React from 'react';
import { CaseCard } from './CaseCard';
import type { CaseItem } from '../src/types';

interface CaseGridProps {
  cases: CaseItem[]
}

export const CaseGrid: React.FC<CaseGridProps> = ({ cases }) => (
  <div className="grid">
    {cases.map(c => <CaseCard key={c.id} {...c} />)}
  </div>
);
