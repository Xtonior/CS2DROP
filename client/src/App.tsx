import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { CasePage } from '../pages/CasePage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/gloabls.css';

export const App: React.FC = () => (
  <Router>
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CasePage />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);
