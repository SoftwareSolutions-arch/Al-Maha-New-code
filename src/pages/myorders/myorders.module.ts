import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyordersPage } from './myorders';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MyordersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyordersPage),
    ComponentsModule
  ],
})
export class MyordersPageModule {}
