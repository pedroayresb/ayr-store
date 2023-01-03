import Router from 'express';
import { newOrderController, getOrdersController } from '../controllers/orders.controllers';

import validateOrder from '../middlewares/orders.middlewares';

const router = Router();

router
  .post('/', validateOrder, newOrderController)
  .get('/', getOrdersController);

export default router;