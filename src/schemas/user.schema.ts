import { Schema } from 'mongoose';
import { Validator } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as Config from 'config';
import * as ms from 'ms';
import * as uuid from 'uuid/v4';
import { get } from 'lodash';
import * as moment from 'moment';

const validator = new Validator();

// TODO: use typegoose instead of regular mongoose
export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    exclude: true
  },
  email: {
    type: String,
    required: true,
    validate: email => validator.isEmail(email)
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  activateAccount: {
    token: {
      exclude: true,
      type: String
    },
    expires: {
      exclude: true,
      type: Date,
      default: moment().add(ms(Config.get('/emailVerification/emailTokenExpiration')), 'ms')
    }
  }
  // resetPassword: {
  //   token: {
  //     exclude: true,
  //     type: String
  //   },
  //   expires: {
  //     exclude: true,
  //     type: Date
  //   }
  // }
});

UserSchema.methods.matchPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, Config.get('/saltNumber'));

  if (!get(this, 'activateAccount.token')) {
    this.activateAccount.token = uuid();
  }
});
