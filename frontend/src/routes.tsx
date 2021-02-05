import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Hero from './pages/Hero';
import SaveHero from './pages/SaveHero';
import FindHeroes from './pages/FindHeroes';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/hero/:id" component={Hero} />
      <Route path="/save-hero" component={SaveHero} />
      <Route path="/find-heroes" component={FindHeroes} />
    </BrowserRouter>
  );
};

export default Routes;
