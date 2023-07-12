import { Router } from 'express';

import { specificationsRouter } from './specifications.routes';
import { categoriesRouter } from './categories.routes';
import { usersRouter } from './users.routes';
import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", specificationsRouter);
router.use("/users", usersRouter);
router.use("/cars", carsRouter);
router.use(authenticateRouter);

export { router };