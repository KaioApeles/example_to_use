import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// Swagger documentation
const swaggerFile = require('../swagger-output.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export { app };
