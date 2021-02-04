import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';

import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Save Heros" />
        </div>

        <div className="buttons-container">
          <Link to="/save-hero" className="save-heroes">
            Salvar Heróis
          </Link>

          <Link to="/find-heroes" className="find-heroes">
            Achar Heróis
          </Link>
        </div>

        <div className="text-container">
          <h2>Salve seus heróis favoritos.</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
