import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import logoImg from '../../assets/images/logo.png';

import './styles.css';
import api from '../../services/api';

const SaveHero: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [completeDescription, setCompleteDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');

  async function handleSaveHero(e: FormEvent): Promise<void> {
    e.preventDefault();

    try {
      await api.post('heroes', {
        name,
        short_description: shortDescription,
        complete_description: completeDescription,
        url_image: urlImage,
      });
      alert('Cadastro realizado com sucesso!');

      history.push('/find-heroes');
    } catch {
      alert('Erro no cadastro!');
    }
  }

  return (
    <div id="page-save-hero-form" className="container">
      <div className="logo-container">
        <img src={logoImg} alt="Save Heros" />
      </div>

      <main>
        <form onSubmit={handleSaveHero}>
          <fieldset>
            <legend>Dados do Herói</legend>
            <Input
              name="name"
              label="Nome do herói"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="short-description"
              label="Descrição curta do herói"
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
            />
            <Textarea
              name="complete-description"
              label="Descrição completa do herói"
              value={completeDescription}
              onChange={e => setCompleteDescription(e.target.value)}
            />
            <Input
              name="url-image"
              label="Url da imagem do herói"
              value={urlImage}
              onChange={e => setUrlImage(e.target.value)}
            />
          </fieldset>

          <footer>
            <button type="submit">Salvar Herói</button>
            <Link to="/">Voltar</Link>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default SaveHero;
