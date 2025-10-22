import React from 'react';
import { useParams } from 'react-router-dom';
import { OpenCaseButton } from '../components/OpenCaseButton';

export const CasePage: React.FC = () => {
  const { id } = useParams();

  const items = [
    { title: 'AWP | Dragon Lore', image: '/items/dragonlore.png' },
    { title: 'M4A4 | Howl', image: '/items/howl.png' },
    { title: 'AK-47 | Redline', image: '/items/redline.png' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Case #{id}</h1>
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem' }}>
        {items.map((item, idx) => (
          <div key={idx} className="card" style={{ width: 150 }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: 10 }} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <OpenCaseButton caseId={Number(id)} />
    </div>
  );
};
