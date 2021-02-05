import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Hero from './pages/Hero';
import SaveHero from './pages/SaveHero';
import EditHero from './pages/EditHero';
import FindHeroes from './pages/FindHeroes';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route exact path="/hero/:id" component={Hero} />
      <Route path="/save-hero" component={SaveHero} />
      <Route path="/edit-hero/:id" component={EditHero} />
      <Route path="/find-heroes" component={FindHeroes} />
    </BrowserRouter>
  );
};

export default Routes;
