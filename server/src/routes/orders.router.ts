import Router from 'express';
import { newOrderController, getOrdersController } from '../controllers/orders.controllers';

import validateOrder from '../middlewares/orders.middlewares';
import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .post('/', validateToken, validateOrder, newOrderController)
  .get('/', validateToken, getOrdersController);

export default router;