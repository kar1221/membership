import logger from '../logger';
import Database from './database';

const query = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)
`;

const database = new Database();

(async () => {
  try {
    await database.safeQuery(query);
  } catch (error) {
    logger.error(`Cannot create table: ${error}`);
  }
})();
