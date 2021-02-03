import { Request, Response } from 'express';
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

      const trx = await db.transaction();

      const hero_id = await trx('heroes').insert({
        name,
        short_description,
        complete_description,
        url_image,
      });

      const hero = await trx('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id[0]);

      await trx.commit();

      return response.status(201).json(hero);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const heroes = await db('heroes').select('*');

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

      const trx = await db.transaction();

      await trx('heroes')
        .update({
          name,
          short_description,
          complete_description,
          url_image,
        })
        .where('heroes.id', '=', hero_id);

      const heroes = await trx('heroes')
        .select('*')
        .where('heroes.id', '=', hero_id);

      await trx.commit();

      return response.status(200).json(heroes);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const hero_id = request.params.id;

      await db('heroes').where('heroes.id', '=', hero_id).del();

      return response.status(204).json({ status: 'Hero deleted' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
