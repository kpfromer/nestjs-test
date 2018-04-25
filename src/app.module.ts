import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { CatModule } from 'modules/cat/cat.module';
import { LoginModule } from 'modules/login/login.module';
import { RegisterModule } from 'modules/register/register.module';
import { TaskModule } from 'modules/task/task.module';
import { RequestContextMiddleware } from 'middleware/request-context/request-context.middleware';
import { AppController } from 'app.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RouterModule, Routes } from 'nest-router';

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
    consumer.apply(RequestContextMiddleware).forRoutes({ path: '*' });
    //   .apply(expressWinston.logger({
    //   transports: [
    //     new winston.transports.Console({
    //       json: true,
    //       colorize: true
    //     })
    //   ],
    //   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    //   msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    //   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    //   ignoreRoute: function(req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    // })).forRoutes({path: '*'})
  }
}
