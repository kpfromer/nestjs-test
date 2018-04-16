import { instanceMethod, prop, Typegoose, InstanceType, pre } from 'typegoose';
import * as ms from 'ms';
import * as Config from 'config';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid/v4';

export class ActivateAccount extends Typegoose {
  // TODO: exclude
  @prop({required: true, default: uuid()})
  token: string;

  // TODO: exclude
  @prop({
    required: true,
    default: moment().add(ms(Config.get('/emailVerification/emailTokenExpiration')), 'ms').toDate()
  })
  expires: Date;
}

@pre<User>('save', async function(next) {
  this.password = await bcrypt.hash(this.password, Config.get('/saltNumber'));
  // console.log(this);
  if (!this.activateAccount) {
    this.activateAccount = {
      token: uuid(),
      expires: moment().add(ms(Config.get('/emailVerification/emailTokenExpiration')), 'ms').toDate()
    } as ActivateAccount;
  }
  return next();
})
export class User extends Typegoose {
  @prop({required: true, unique: true})
  username: string;

  // TODO: add exclude: true
  @prop({required: true})
  password: string;

  // TODO: add validate
  @prop({required: true})
  email: string;

  @prop({required: true})
  firstName: string;

  @prop({required: true})
  lastName: string;

  @prop({required: true, default: false})
  isActive: boolean;

  @prop()
  activateAccount?: ActivateAccount;

  @instanceMethod
  async matchPassword(this: InstanceType<User>, password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
