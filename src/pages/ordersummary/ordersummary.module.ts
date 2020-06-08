import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersummaryPage } from './ordersummary';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrdersummaryPage
  ],
  imports: [
    IonicPageModule.forChild(OrdersummaryPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class OrdersummaryPageModule {}
