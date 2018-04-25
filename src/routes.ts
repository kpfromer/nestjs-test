import { RegisterModule } from './modules/register/register.module';
import { Routes } from 'nest-router';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { LoginModule } from './modules/login/login.module';

export const AppRoutes: Routes = [
  {
    path: 'v1',
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
