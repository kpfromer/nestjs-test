import { Component } from '@nestjs/common';
import * as Config from 'config';
import { AuthService } from 'modules/auth/auth.service';
import { EmailService } from 'modules/email/email.service';
import * as uuid from 'uuid/v4';
import { InstanceType } from 'typegoose';
import { User } from '../../model/user.model';

@Component()
export class RegisterService {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  createId() {
    return uuid();
  }

  async sendWelcomeEmail(user: InstanceType<User>, id: string) {
    const emailOptions = {
      subject: `Activate your ${Config.get('/websiteName')} account`,
      to: {
        name: `${user.firstName} ${user.lastName}`,
        address: user.email
      }
    };

    const welcomeTemplateOptions = {
      token: id,
      clientURL: Config.get('/clientURL'),
      projectName: Config.get('/projectName')
    };

    await this.emailService.sendEmail(
      emailOptions,
      'welcome',
      welcomeTemplateOptions
    );
  }
}
