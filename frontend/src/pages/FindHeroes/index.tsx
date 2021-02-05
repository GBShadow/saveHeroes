import React, { useCallback, useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/heroes?page=${page}`).then(response => {
      setHeroes(response.data);
    });
  }, [page]);

  console.log('length', heroes.length);
  const nextPage = useCallback(() => {
    if (heroes.length < 9) {
      setPage(page);

      return;
    }
    setPage(page + 1);
  }, [page, heroes]);

  const previousPage = useCallback(() => {
    if (page === 1) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  }, [page]);

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
          <button type="button" onClick={previousPage} className="page-button">
            Anterior
          </button>
          <div className="page-number">
            <span>{page}</span>
          </div>
          <button type="button" onClick={nextPage} className="page-button">
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
};

export default FindHeroes;
