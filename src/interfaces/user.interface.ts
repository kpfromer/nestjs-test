import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  activateAccount: { token: string; expires: Date };

  matchPassword(password: string): Promise<boolean>;
}
