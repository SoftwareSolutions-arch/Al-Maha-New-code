import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderplacedPage } from './orderplaced';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    OrderplacedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderplacedPage),
    ComponentsModule
  ],
})
export class OrderplacedPageModule {}
