import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { TaskListComponent } from './dashboard/task-list/task-list.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        component: TaskListComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
