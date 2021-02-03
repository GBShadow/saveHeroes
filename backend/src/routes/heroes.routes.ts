import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import HeroesController from '../controllers/HeroesController';

const heroesRouter = Router();
const heroesController = new HeroesController();

heroesRouter.get('/', heroesController.index);
heroesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      short_description: Joi.string().required(),
      complete_description: Joi.string().required(),
      url_image: Joi.string().required(),
    },
  }),
  heroesController.create,
);
heroesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  heroesController.show,
);
heroesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  heroesController.update,
);
heroesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  heroesController.delete,
);

export default heroesRouter;
