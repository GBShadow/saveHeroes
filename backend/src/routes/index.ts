import { Router } from 'express';
import heroesRouter from './heroes.routes';
import docsRouter from './docs.routes';

const routes = Router();

routes.use('/heroes', heroesRouter);
routes.use('/docs', docsRouter);

export default routes;
