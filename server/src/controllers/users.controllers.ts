import { Request, Response } from 'express';
import { registerUser, updatePassword, updateUsername, getUserProfile } from '../services/users.services';

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const addedUser = await registerUser(username, email, password);

  res.status(201).json(addedUser);
};

const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { locals: { user } } = res;

  const updatedUser = await updatePassword(user.id, password);

  res.status(200).json(updatedUser);
};

const changeUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  const { locals: { user } } = res;

  const updatedUser = await updateUsername(user.id, username);

  res.status(200).json(updatedUser);
};

const getProfile = async (req: Request, res: Response) => {
  const { locals: { user } } = res;

  const profile = await getUserProfile(user.id);

  res.status(200).json(profile);
};


export { register, changePassword, changeUsername, getProfile }; 