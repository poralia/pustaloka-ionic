import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformationPage } from './information.page';

import { InformationPageRoutingModule } from './information-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InformationPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    InformationPage,
  ]
})
export class InformationPageModule {}
