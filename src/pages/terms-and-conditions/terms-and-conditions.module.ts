import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsAndConditionsPage } from './terms-and-conditions';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TermsAndConditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsAndConditionsPage),
    ComponentsModule
  ],
})
export class TermsAndConditionsPageModule {}
