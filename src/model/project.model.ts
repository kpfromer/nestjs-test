import { prop, Typegoose } from 'typegoose';

export class Project extends Typegoose {

  @prop({required: true})
  readonly name: string;

  @prop({required: true})
  readonly color: string;

  @prop({required: true})
  readonly userId: string;
}