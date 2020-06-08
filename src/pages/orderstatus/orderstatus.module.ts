import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderstatusPage } from './orderstatus';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderstatusPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderstatusPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class OrderstatusPageModule {}
