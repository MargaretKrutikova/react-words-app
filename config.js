export const nodeEnv = process.env.NODE_ENV || 'development';

export default {
  port: process.env.PORT || 8081,
  host: process.env.HOST || 'localhost',
  apiUrl: process.env.API_URL || 'http://localhost:4000/graphql',
};