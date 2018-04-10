import {Document} from 'mongoose';

export interface IAuthAttempt extends Document{
  username: string;
  ip: string;
  time: Date;
}