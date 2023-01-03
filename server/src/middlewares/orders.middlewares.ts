import { Request, Response, NextFunction } from 'express';

const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;

  if (!products || !products.length) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
}

export default validateOrder;