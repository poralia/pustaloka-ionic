import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { WelcomeScreenComponent } from './screens/welcome-screen/welcome-screen.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    WelcomeScreenComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    IonicModule,
  ]
})
export class LandingModule { }
