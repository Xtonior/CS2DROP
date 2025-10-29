import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { AdminPanel } from '../pages/AdminPanel';
import { CasePage } from '../pages/CasePage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.css';
import { SkinsPanel } from '../pages/admin/SkinsPanel';
import { CasesPanel } from '../pages/admin/CasesPanel';

export const App: React.FC = () => (
  <Router>
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CasePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/skinspanel" element={<SkinsPanel />} />
        <Route path="/admin/casespanel" element={<CasesPanel />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);
