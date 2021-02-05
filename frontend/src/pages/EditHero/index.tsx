import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import logoImg from '../../assets/images/logo.png';

import './styles.css';
import api from '../../services/api';

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

const SaveHero: React.FC<MatchParams> = ({ match }) => {
  const history = useHistory();

  const { id } = match.params;

  const [hero, setHero] = useState<Hero>({} as Hero);
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [completeDescription, setCompleteDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    async function load(): Promise<void> {
      const response = await api.get(`/heroes/${id}`);
      setHero(response.data[0]);
    }
    load();
  }, [id, hero]);

  useEffect(() => {
    async function load(): Promise<void> {
      setName(hero.name);
      setShortDescription(hero.short_description);
      setCompleteDescription(hero.complete_description);
      setUrlImage(hero.url_image);
    }
    load();
  }, [
    hero.name,
    hero.short_description,
    hero.complete_description,
    hero.url_image,
  ]);

  function handleSaveHero(e: FormEvent): void {
    e.preventDefault();

    api
      .put(`heroes/${id}`, {
        name,
        short_description: shortDescription,
        complete_description: completeDescription,
        url_image: urlImage,
      })
      .then(() => {
        alert('Edição realizada com sucesso!');

        history.goBack();
      })
      .catch(() => {
        alert('Erro na edição!');
      });
  }

  return (
    <div id="page-save-hero-form" className="container">
      <div className="logo-container">
        <img src={logoImg} alt="Save Heros" />
      </div>

      <main>
        <form onSubmit={handleSaveHero}>
          <fieldset>
            <legend>Edição de dados do herói</legend>
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
            <button type="submit">Atualizar Herói</button>
            <Link to="/find-heroes">Voltar</Link>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default SaveHero;
