import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'User Authentication API',
    description: 'API for user management and authentication',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    CreateUser: {
      email: 'user@example.com',
      password: '123456',
    },
    Login: {
      email: 'user@example.com',
      password: '123456',
    },
    User: {
      id: 1,
      email: 'user@example.com',
      createdAt: '2024-03-19T12:00:00Z',
      updatedAt: '2024-03-19T12:00:00Z',
      deletedAt: null,
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outputFile, routes, doc); 