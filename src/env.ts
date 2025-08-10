import 'dotenv/config';
import { z } from 'zod/v4';

import logger from './logger.js';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  COOKIE_SECRET: z.coerce.string().nonempty().min(16),
  NODE_ENV: z.coerce.string().default('development'),
  DB_PASS: z.coerce.string().nonempty(),
  DB_USER: z.coerce.string().nonempty(),
  DB_NAME: z.coerce.string().nonempty(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.coerce.string().nonempty()
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const bad = error.issues
      .flatMap((i) => i.path.join('.'))
      .filter(Boolean)
      .join(', ');

    logger.error(error);

    throw new Error(`Invalid of missing enviroment variable: ${bad}`);
  }

  logger.error(`Internal error: ${error}`);
  throw error;
}

export default envSchema.parse(process.env);
