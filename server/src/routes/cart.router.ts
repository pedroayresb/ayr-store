import Router from 'express';
import { newCartController, getCartController, deleteProductFromCartController } from '../controllers/cart.controllers';

import validateOrder from '../middlewares/orders.middlewares';
import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .post('/', validateToken, validateOrder, newCartController)
  .get('/', validateToken, getCartController)
  .delete('/', validateToken, validateOrder, deleteProductFromCartController);

export default router;