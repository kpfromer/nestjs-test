import { prop, Ref, Typegoose } from 'typegoose';
import { User } from './user.model';
import { Project } from './project.model';

export class Task extends Typegoose {

  @prop({required: true})
  description: string;

  @prop({required: true})
  complete: boolean;

  @prop({ref: Project})
  project: Ref<Project>;

  @prop({default: 0})
  priority: number;

  @prop()
  duedate: Date;

  // TODO: select should be false
  @prop({required: true, ref: User})
  userId: Ref<User>;
}