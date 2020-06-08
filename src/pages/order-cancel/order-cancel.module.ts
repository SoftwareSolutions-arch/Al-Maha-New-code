import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCancelPage } from './order-cancel';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    OrderCancelPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCancelPage),
    ComponentsModule
  ],
})
export class OrderCancelPageModule {}
