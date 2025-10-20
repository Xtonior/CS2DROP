import React from 'react';
import { CaseGrid } from '../components/CaseGrid';

const sampleCases = [
  { id: 1, title: 'Starter Case', price: 1, image: 'assets/cases/case_fracture.webp' },
  { id: 2, title: 'Pro Case', price: 5, image: 'assets/cases/case_fracture.webp' },
  { id: 3, title: 'Legendary Case', price: 20, image: 'assets/cases/case_fracture.webp' },
];

export const Home: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <div className='grid-text'>
      <h2>Available Cases</h2>
    </div>
    <CaseGrid cases={sampleCases} />
  </div>
);
