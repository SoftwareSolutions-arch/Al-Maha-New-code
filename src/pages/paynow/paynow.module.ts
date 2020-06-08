import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaynowPage } from './paynow';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PaynowPage,
  ],
  imports: [
    IonicPageModule.forChild(PaynowPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class PaynowPageModule {}
