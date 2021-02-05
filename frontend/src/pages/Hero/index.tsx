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

interface MatchParams {
  match: {
    params: {
      id: string;
    };
  };
}

const Hero: React.FC<MatchParams> = ({ match }) => {
  const [hero, setHero] = useState<Hero>({} as Hero);

  const { id } = match.params;
  console.log('Hero', hero);

  useEffect(() => {
    async function load(): Promise<void> {
      const response = await api.get(`/heroes/${id}`);
      setHero(...response.data);
    }
    load();
  }, [id]);

  return (
    <div id="page-hero">
      <div className="logo-container">
        <img src={logoImg} alt="Save Heroes" />
      </div>

      <main>
        <div className="hero-content-container">
          <div className="hero-container">
            <div className="hero-avatar-container">
              <img src={hero.url_image} alt={hero.name} />
            </div>
            <div className="text-content">
              <strong>{hero.name}</strong>
              <span>{hero.short_description}</span>
              <p>
                <strong>Descrição: </strong>
                {hero.complete_description}
              </p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Link to="/find-heroes" className="back-button">
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Hero;
