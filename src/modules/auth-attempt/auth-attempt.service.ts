import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthAttemptSchema } from 'schemas/auth-attempt.model';
import { Model } from 'mongoose';
import { IAuthAttempt } from 'interfaces/auth-attempt.interface';
import * as Config from 'config';
import * as ms from 'ms';
import { RequestContext } from 'middleware/request-context/request-context';

const expirationDate = {$gt: new Date()};

@Component()
export class AuthAttemptService {
  constructor(
    @InjectModel(AuthAttemptSchema)
    private readonly authAttemptModel: Model<IAuthAttempt>
  ) {}

  private async getIpAttemptCount(ip: string): Promise<number> {
    return await this.authAttemptModel
      .count({ ip, time: expirationDate })
      .exec();
  }

  private async getIpAndUsernameAttemptCount(
    ip: string,
    username: string
  ): Promise<number> {
    return await this.authAttemptModel.count({
      ip,
      time: expirationDate,
      username
    });
  }

  async isAbuse(username: string): Promise<boolean> {
    const ip = RequestContext.currentIp();

    // TODO: find more efficient way of seeing if user is abusive
    const ipAttemptCount = await this.getIpAttemptCount(ip);
    const ipAndUsernameAttemptCount = await this.getIpAndUsernameAttemptCount(
      ip,
      username
    );

    return (
      (await ipAttemptCount) >= Config.get('/authAttempts/forIp') ||
      ipAndUsernameAttemptCount >= Config.get('/authAttempts/forIpAndUser')
    );
  }

  async addAttempt(username: string): Promise<IAuthAttempt> {
    return await this.authAttemptModel.create({
      ip: RequestContext.currentIp(),
      username: username.toLocaleLowerCase(),
      time: new Date()
    });
  }
}
