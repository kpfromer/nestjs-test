import { prop, Typegoose } from 'typegoose';
import {IsString} from 'class-validator';

export class Cat extends Typegoose {
  @IsString()
  @prop({ required: true })
  name: string;
}