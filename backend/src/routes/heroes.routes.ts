import { Router } from 'express';
import heroesController from '../controllers/HeroesController';

const heroesRoutes = Router();

heroesRoutes.get('/', heroesController);

export default heroesRoutes;
