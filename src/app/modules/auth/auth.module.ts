import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { LoginFormComponent } from './partials/login-form/login-form.component';
import { RegisterFormComponent } from './partials/register-form/register-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivationScreenComponent } from './screens/activation-screen/activation-screen.component';
import { ActivationFormComponent } from './partials/activation-form/activation-form.component';
import { ResetPasswordScreenComponent } from './screens/reset-password-screen/reset-password-screen.component';
import { ResetPasswordFormComponent } from './partials/reset-password-form/reset-password-form.component';
import { SettingScreenComponent } from './screens/setting-screen/setting-screen.component';


@NgModule({
  declarations: [
    // Screens
    LoginScreenComponent,
    RegisterScreenComponent,
    ActivationScreenComponent,
    ResetPasswordScreenComponent,
    SettingScreenComponent,

    // Partials
    LoginFormComponent,
    RegisterFormComponent,
    ActivationFormComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
