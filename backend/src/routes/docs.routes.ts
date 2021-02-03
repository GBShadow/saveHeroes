import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import apiSchema from '../schemas/api.schema.json';

const docsRouter = Router();

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(apiSchema));

export default docsRouter;
