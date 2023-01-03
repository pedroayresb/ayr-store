import jwt from 'jsonwebtoken';
import UserModel from '../models/Users';
import CryptoJS from 'crypto-js';

const secret: string = process.env.JWT_SECRET || 'secret';

const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const encryptedPassword = CryptoJS.SHA256(password).toString();
  const newUser = new UserModel(username, encryptedPassword, email, 1);
  const addedUserId = await newUser.save();

  const token = jwt.sign({ data: addedUserId }, secret);

  return { token };
};

const updatePassword = async (id: number, password: string) => {
  const encryptedPassword = CryptoJS.SHA256(password).toString();
  const user = new UserModel('', '', '', 1);
  const updatedUser = await user.changePassword(id, encryptedPassword);

  return updatedUser;
}

const updateUsername = async (id: number, newUsername: string) => {
  const user = new UserModel('', '', '', 1);
  const updatedUser = await user.changeUsername(id, newUsername);

  return updatedUser;
}


export { registerUser, updatePassword, updateUsername };