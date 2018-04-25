import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { RequestContext } from '../../middleware/request-context/request-context';
import { LooseObject } from '../../interface/loose-object.interface';

@Injectable()
export class LoggedInService {
  constructor() {}

  private getUserId(): string {
    const user = RequestContext.currentUser();
    console.log('user', user);
    if (!user || !user.id) {
      throw new Error('No user id or user!');
    }
    return user.id;
  }

  // TODO: add methods for CRUD which can all mongoose default params but attaches userid to the condition

  private attachUserId(condition: LooseObject = {}) {
    condition.userId = this.getUserId();
    return condition;
  }

  // TODO: find better way so that model is not needed constantly
  async getAll<T extends Document>(model: Model<T>): Promise<T[]> {
    return await model.find(this.attachUserId()).exec();
  }

  async getAllWithCondition<T extends Document>(model: Model<T>, conditions: LooseObject): Promise<T[]> {
    return await model.find(this.attachUserId(conditions)).exec();
  }

  async getById<T extends Document>(
    model: Model<T>,
    id: string
  ): Promise<T | null> {
    return await model.findOne(this.attachUserId({ _id: id})).exec();
  }

  async create<T extends Document>(model: Model<T>, item): Promise<T> {
    item.userId = this.getUserId();
    return await model.create(item);
  }

  async updateById<T extends Document>(
    model: Model<T>,
    id: string,
    newModel
  ): Promise<T> {
    delete newModel._id;
    newModel.userId = this.getUserId();
    return await model
      .update(this.attachUserId({_id: id}), newModel, {
        overwrite: true
      })
      .exec();
  }

  async deleteById<T extends Document>(model: Model<T>, id: string) {
    return await model.deleteOne(this.attachUserId({_id: id})).exec();
  }
}
