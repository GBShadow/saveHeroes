import { Router } from 'express';
import heroesRoutes from './heroes.routes';

const routes = Router();

routes.use('/heroes', heroesRoutes);

export default routes;
