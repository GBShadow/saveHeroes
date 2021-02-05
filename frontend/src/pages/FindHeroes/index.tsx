import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';
import api from '../../services/api';

import './styles.css';

interface Hero {
  id: number;
  name: string;
  short_description: string;
  complete_description: string;
  url_image: string;
}

const FindHeroes: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  useEffect(() => {
    api.get('/heroes').then(response => {
      setHeroes(response.data);
    });
  }, []);

  return (
    <div id="page-find-heroes">
      <div className="logo-container">
        <img src={logoImg} alt="Save Heroes" />
      </div>

      <div className="button-container">
        <Link to="/save-hero" className="save-heroes">
          Salvar um novo Herói?
        </Link>
      </div>

      <main>
        <div className="content-container">
          {heroes.map(hero => {
            return (
              <div className="hero-container" key={hero.id}>
                <div className="avatar-container">
                  <img src={hero.url_image} alt={hero.name} />
                </div>
                <strong>{hero.name}</strong>
                <span>{hero.short_description}</span>
                <div className="button-container">
                  <Link to={`/hero/${hero.id}`} className="hero-button">
                    Ver sobre o herói
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="buttons-container">
          <button type="button" className="page-button">
            Anterior
          </button>
          <div className="page-number">
            <span>1</span>
          </div>
          <button type="button" className="page-button">
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
};

export default FindHeroes;
