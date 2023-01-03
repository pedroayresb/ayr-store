import { AddedUserInterface } from './../interfaces/users.interfaces';


import jwt from 'jsonwebtoken';
import User from '../models/Users';

const secret: string = process.env.JWT_SECRET || 'secret';

const userLogim = async (username: string, password: string) => {
  const user = new User('', '', '', 1);
  const userLogin = await user.login(username);

  if (!userLogin.length) {
    return null;
  }

  const loggedUser = userLogin.find((u) => u.password === password);

  if (!loggedUser) {
    return null;
  }

  const token = jwt.sign({ id: loggedUser!.id }, secret);

  return token as string;
};

export default userLogim;