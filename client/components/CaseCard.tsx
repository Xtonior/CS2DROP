import React from 'react';
import { Link } from 'react-router-dom';

interface CaseCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({ id, title, price, image }) => (
  <div className="card">
    <img src={image} alt={title} style={{ borderRadius: '10px', width: '100%' }} />
    <h3>{title}</h3>
    <p>Min price: ${price.toFixed(2)}</p>
    <Link to={`/case/${id}`}>
      <button>Open Case</button>
    </Link>
  </div>
);
