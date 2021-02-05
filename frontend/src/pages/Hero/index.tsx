import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [hero, setHero] = useState({} as Hero);

  const { id } = match.params;

  useEffect(() => {
    async function load(): Promise<void> {
      const response = await api.get(`/heroes/${id}`);
      setHero(response.data[0]);
    }
    load();
  }, [id]);

  const deleteItem = useCallback(
    (hero_id: number) => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('Você realmente que apagar esse herói?');

      if (result) {
        api.delete(`heroes/${hero_id}`).then(() => {
          alert('Herói deletado!!!');
          history.push('/find-heroes');
        });
      }
    },
    [history],
  );

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
              <div className="buttons-container-hero">
                <button className="edit" type="button">
                  <Link to={`/edit-hero/${hero.id}`}>Editar</Link>
                </button>

                <button
                  onClick={() => deleteItem(hero.id)}
                  className="delete"
                  type="button"
                >
                  Apagar
                </button>
              </div>
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
