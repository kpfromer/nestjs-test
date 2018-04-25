import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { LoginModule } from 'modules/login/login.module';
import { RegisterModule } from 'modules/register/register.module';
import { TaskModule } from 'modules/task/task.module';
import { RequestContextMiddleware } from 'middleware/request-context/request-context.middleware';
import { AppController } from 'app.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RouterModule } from 'nest-router';
import { AppRoutes } from './routes';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nestjs-login'),
    RouterModule.forRoutes(AppRoutes),
    AuthModule,
    ProjectModule,
    LoginModule,
    RegisterModule,
    TaskModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply([RequestContextMiddleware, LoggerMiddleware])
      .forRoutes('*');
  }
}
