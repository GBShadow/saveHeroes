import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import db from '../database/connection';

export default class HeroesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        short_description,
        complete_description,
        url_image,
      } = request.body;

      const heroExisting = await db('heroes')
        .select('*')
        .where('heroes.name', '=', name);

      if (heroExisting.length !== 0) {
        throw new AppError('Hero are ready existing');
      }

      await db('heroes').insert({
        name,
        short_description,
        complete_description,
        url_image,
      });

      return response.status(201).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { page = 1 } = request.query;

      const heroes = await db('heroes')
        .limit(9)
        .offset((Number(page) - 1) * 9)
        .select('*');

      return response.status(200).json(heroes);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const hero_id = request.params.id;

      const hero = await db('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id);

      if (!hero.length) {
        throw new AppError('Hero not found');
      }

      return response.status(200).json(hero);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const hero_id = request.params.id;
      const {
        name,
        short_description,
        complete_description,
        url_image,
      } = request.body;

      const hero = await db('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id);

      if (!hero.length) {
        throw new AppError('Hero not found');
      }

      await db('heroes')
        .update({
          name,
          short_description,
          complete_description,
          url_image,
        })
        .where('heroes.id', '=', hero_id);

      const heroes = await db('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id);

      return response.status(200).json(heroes);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const hero_id = request.params.id;

      const hero = await db('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id);

      if (!hero.length) {
        throw new AppError('Hero not found');
      }

      await db('heroes').where('heroes.id', '=', hero_id).del();

      return response.status(204).json({ status: 'Hero deleted' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
