import { Request, Response } from 'express';

export default class HeroesController {
  public async create(request: Request, response: Response) {
    const {
      name,
      short_description,
      complete_description,
      url_image,
    } = request.body;
  }
}
