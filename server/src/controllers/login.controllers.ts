import { Request, Response } from 'express';
import loginService from '../services/login.services';
import CryptoJS from 'crypto-js';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const encryptedPassword = CryptoJS.SHA256(password).toString();
  const token = await loginService(username, encryptedPassword);

  if (!token) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  res.status(200).json({ token });
};

export default login;