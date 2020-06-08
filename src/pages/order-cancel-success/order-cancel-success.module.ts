import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCancelSuccessPage } from './order-cancel-success';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    OrderCancelSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCancelSuccessPage),
    ComponentsModule
  ],
})
export class OrderCancelSuccessPageModule {}
