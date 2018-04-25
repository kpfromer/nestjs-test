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
import { Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/project',
        module: ProjectModule,
      },
      {
        path: '/task',
        module: TaskModule,
      },
      {
        path: '/login',
        module: LoginModule
      },
      {
        path: 'register',
        module: RegisterModule
      }
    ]
  }
];

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nestjs-login'),
    AuthModule,
    ProjectModule,
    LoginModule,
    RegisterModule,
    // CatModule,
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
