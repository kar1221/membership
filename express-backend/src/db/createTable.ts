import Database from './database';

const query = `
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(10) CHECK (role IN ('Admin', 'User')) NOT NULL,
    "joinedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const database = new Database();

(async () => {
  await database.safeQuery(query);
})();
