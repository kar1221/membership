import app from './app';
import env from './env';
import logger from './logger';

const { PORT } = env;

const server = app.listen(PORT, () => {
  logger.info(`Server started on port: ${PORT}`);
});

server.on('error', (error) => {
  logger.error(error);
  throw error;
});
