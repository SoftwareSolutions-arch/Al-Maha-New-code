import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryaddressPage } from './deliveryaddress';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DeliveryaddressPage
  ],
  imports: [
    IonicPageModule.forChild(DeliveryaddressPage),
    ComponentsModule,
    TranslateModule.forChild()

  ],
})
export class DeliveryaddressPageModule {}
