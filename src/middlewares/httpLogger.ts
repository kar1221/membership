import logger from '../logger';

import type { NextFunction, Request, Response } from 'express';

function httpLogger(req: Request, _res: Response, next: NextFunction): void {
  logger.info(`[${req.method}] ${req.path}`);
  next();
}

export default httpLogger;
