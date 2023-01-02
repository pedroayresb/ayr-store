

import { Request, Response, NextFunction } from 'express';
import { AddedUserInterface } from '../interfaces/users.interfaces';

const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username }: AddedUserInterface = req.body;
  
  if (!username) {
    return res.status(400).json({ message: '"username" is required' });
  }
  if (typeof username !== 'string') {
    return res.status(422).json({ message: '"username" must be a string' });
  }
  if (username.length < 3) {
    return res
      .status(422).json({ message: '"username" length must be at least 3 characters long' });
  }

  next();
};

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email }: AddedUserInterface = req.body;
  
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (typeof email !== 'string') {
    return res.status(422).json({ message: '"email" must be a string' });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password }: AddedUserInterface = req.body;
  
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (typeof password !== 'string') {
    return res.status(422).json({ message: '"password" must be a string' });
  }
  if (password.length < 8) {
    return res
      .status(422).json({ message: '"password" length must be at least 8 characters long' });
  }

  next();
};

export { validateUsername, validateEmail, validatePassword };
