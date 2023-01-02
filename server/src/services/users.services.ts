import jwt from 'jsonwebtoken';
import UserModel from '../models/Users';

const secret: string = process.env.JWT_SECRET || 'secret';

const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const newUser = new UserModel(username, password, email, 1);
  const addedUserId = await newUser.save();

  const token = jwt.sign({ data: addedUserId }, secret);

  return { token };
};

const updatePassword = async (username: string, password: string) => {
  const user = new UserModel('', '', '', 1);
  const updatedUser = await user.changePassword(username, password);

  return updatedUser;
}

const updateUsername = async (username: string, newUsername: string) => {
  const user = new UserModel('', '', '', 1);
  const updatedUser = await user.changeUsername(username, newUsername);

  return updatedUser;
}


export { registerUser, updatePassword, updateUsername };