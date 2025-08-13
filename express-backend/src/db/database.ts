import { Pool } from 'pg';

import env from '../env';
import DatabaseError from '../errors/DatabaseError';
import logger from '../logger';

import type { PoolConfig, QueryConfig, QueryResult, QueryResultRow } from 'pg';

type QueryParam = string | number | boolean | Date | null | undefined;

class Database {
  private readonly pool: Pool;

  constructor() {
    const config: PoolConfig = {
      user: env.DB_USER,
      password: env.DB_PASS,
      host: env.DB_HOST,
      database: env.DB_NAME,
      port: env.DB_PORT
    };

    this.pool = new Pool(config);
  }

  async safeQuery<T extends QueryResultRow>(
    query: string | QueryConfig,
    params?: QueryParam[]
  ): Promise<QueryResult<T>> {
    try {
      return await this.pool.query<T>(query, params);
    } catch (error) {
      logger.error(`Database query error: ${error}`);
      throw new DatabaseError('Query Failed');
    }
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export default Database;
