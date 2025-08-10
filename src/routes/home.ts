import { Router } from 'express';

import renderHomePage from '../controllers/homeController';

const homeRouter = Router();

homeRouter.get('/', renderHomePage);

export default homeRouter;
