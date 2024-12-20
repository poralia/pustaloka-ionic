import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsHeaderComponent } from './components/tabs-header/tabs-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TabsHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TabsHeaderComponent,
  ]
})
export class SharedModule { }
