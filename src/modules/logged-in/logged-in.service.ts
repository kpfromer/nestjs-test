import {Component} from '@nestjs/common';
import {Document, Model} from 'mongoose';
import {RequestContext} from '../../middleware/request-context/request-context';

@Component()
export class LoggedInService {
  constructor() {}

  private getUserId(): string {
    const user = RequestContext.currentUser();
    if (!user || !user.id) {
      throw new Error('No user id or user!');
    }
    return user.id;
  }

  async getAll<T extends Document>(model: Model<T>): Promise<T[]> {
    return await model.find({userId: this.getUserId()}).exec();
  }

  async getById<T extends Document>(model: Model<T>, id: string): Promise<T | null> {
    return await model.findOne({_id: id, userId: this.getUserId()}).exec();
  }

  async create<T extends Document>(model: Model<T>, item): Promise<T> {
    item.userId = this.getUserId();
    return await model.create(item);
  }

  async updateById<T extends Document>(model: Model<T>, id: string, newModel): Promise<T> {
    delete newModel._id;
    newModel.userId = this.getUserId();
    return await model.update({_id: id, userId: this.getUserId()}, newModel, {overwrite: true}).exec();
  }

  async deleteById<T extends Document>(model: Model<T>, id: string) {
    return await model.deleteOne({_id: id, userId: this.getUserId()}).exec();
  }
}