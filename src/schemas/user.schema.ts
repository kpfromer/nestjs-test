import { Schema } from 'mongoose';
import { Validator } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as Config from 'config';

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
  }
  // resetPassword: {
  //   token: {
  //     allowOnCreate: false,
  //     allowOnUpdate: false,
  //     exclude: true,
  //     type: String
  //   },
  //   expires: {
  //     allowOnCreate: false,
  //     allowOnUpdate: false,
  //     exclude: true,
  //     type: Date
  //   }
  // },
  // activateAccount: {
  //   token: {
  //     allowOnCreate: false,
  //     allowOnUpdate: false,
  //     exclude: true,
  //     type: String
  //   },
  //   expires: {
  //     allowOnCreate: false,
  //     allowOnUpdate: false,
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
});
