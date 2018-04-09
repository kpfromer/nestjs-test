import {Document} from 'mongoose';

export interface ITask extends Document {
  _id: string;
  description: string;
  complete: boolean;
  projectId: string;
}