import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutcompanyPage } from './aboutcompany';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AboutcompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutcompanyPage),
    ComponentsModule
  ],
})
export class AboutcompanyPageModule {}
