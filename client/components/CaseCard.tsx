import React from 'react';
import type { CaseItem } from '../src/types';
import { useNavigate } from 'react-router-dom';

export const CaseCard: React.FC<CaseItem> = ({ id, name, price, imagePath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/case/${id}`);
  }

  return (
    <div className="case-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imagePath} alt={name} style={{ width: '100px', height: '100px', objectFit: "fill" }} />
      <h3>{name}</h3>
      <span>{price}$</span>
    </div>
  )
}
