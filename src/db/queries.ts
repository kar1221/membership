import Database from './database';

const database = new Database();

async function fetchUserForAuth(username: string): Promise<AuthUser | null> {
  const { rows } = await database.safeQuery<AuthUser>(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );

  if (rows.length) {
    return rows[0];
  }

  return null;
}

async function fetchUserForSession(id: number): Promise<Express.User | null> {
  const { rows } = await database.safeQuery<Express.User>(
    'SELECT id, username FROM users WHERE id = $1',
    [id]
  );

  if (rows.length) {
    return rows[0];
  }

  return null;
}

export { fetchUserForAuth, fetchUserForSession };
