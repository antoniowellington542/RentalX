import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { createConnection } from './database';
import './shared/container';
import { router } from './routes';
import swaggerFile from './swagger.json';

createConnection()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Running'));
