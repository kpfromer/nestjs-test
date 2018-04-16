import { prop, Typegoose } from 'typegoose';

export class AuthAttempt extends Typegoose {

  // TODO: remove email and link to attempted user id (so if user changes email)
  @prop({required: true})
  username: string;

  @prop({required: true})
  ip: string;

  @prop({required: true})
  time: Date;
}