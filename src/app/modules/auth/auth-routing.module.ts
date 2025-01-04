import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { ActivationScreenComponent } from './screens/activation-screen/activation-screen.component';
import { ResetPasswordScreenComponent } from './screens/reset-password-screen/reset-password-screen.component';
import { SettingScreenComponent } from './screens/setting-screen/setting-screen.component';
import { authenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginScreenComponent,
      },
      {
        path: 'register',
        component: RegisterScreenComponent,
      },
      {
        path: 'activation',
        component: ActivationScreenComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordScreenComponent,
      },
      {
        path: 'setting',
        component: SettingScreenComponent,
        canActivate: [authenticatedGuard],
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
