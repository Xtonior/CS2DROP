import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header>
    <h1>CS2DROP</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/case/1">Example Case</Link>
    </nav>
  </header>
);
