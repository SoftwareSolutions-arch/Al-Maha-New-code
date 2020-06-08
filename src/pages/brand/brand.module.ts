import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandPage } from './brand';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BrandPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandPage),
    ComponentsModule
  ],
})
export class BrandPageModule {}
