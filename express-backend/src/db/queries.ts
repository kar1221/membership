import Database from './database';

const database = new Database();

async function fetchUserDataFromId(id: number): Promise<Express.User | null> {
  const { rows } = await database.safeQuery<Express.User>(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );

  if (rows.length) {
    return rows[0];
  }

  return null;
}

async function fetchUserDataFromUsername(
  username: string
): Promise<Express.User | null> {
  const { rows } = await database.safeQuery<Express.User>(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );

  if (rows.length) {
    return rows[0];
  }

  return null;
}

async function createUser(info: SignUpInfo): Promise<Express.User | null> {
  const { username, password, firstName, lastName, role } = info;

  const query = `
    INSERT INTO users ("username", "firstName", "lastName", "password", "role")
    VALUES ($1, $2, $3, $4, $5) RETURNING "id", "username", "firstName", "lastName", "role", "joinedDate"; 
    `;

  const { rows } = await database.safeQuery<Express.User>(query, [
    username,
    firstName,
    lastName,
    password,
    role
  ]);

  if (rows.length) return rows[0];

  return null;
}

export { createUser, fetchUserDataFromId, fetchUserDataFromUsername };
