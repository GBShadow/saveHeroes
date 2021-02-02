import e from 'express';
import express, { Request, Response, NextFunction } from 'express';
import AppError from './errors/AppError';
import routes from './routes';

const app = express();

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Start backend in port 3333');
});
