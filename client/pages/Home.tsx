import React from 'react';
import { CaseGrid } from '../components/CaseGrid';

const sampleCases = [
  { id: 1, title: 'Starter Case', price: 1, image: '/cases/case1.png' },
  { id: 2, title: 'Pro Case', price: 5, image: '/cases/case2.png' },
  { id: 3, title: 'Legendary Case', price: 20, image: '/cases/case3.png' },
];

export const Home: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Available Cases</h2>
    <CaseGrid cases={sampleCases} />
  </div>
);
