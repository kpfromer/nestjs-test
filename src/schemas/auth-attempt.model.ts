import { Schema } from 'mongoose';

export const AuthAttemptSchema = new Schema({
  // TODO: remove email and link to attempted user id (so if user changes email)
  username: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});
