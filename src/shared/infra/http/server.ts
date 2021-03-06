import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors'
import routes from './routes';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm'; 
import '@shared/container/index.ts';

const app = express();

app.use(cors())

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder))
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
});

app.listen(3333, () => {
  console.log(':) Server starter on port 3333');
});