import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import {ComponentsModule} from "../../components/components.module";
import {StarRatingModule} from "ionic3-star-rating";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
    imports: [
        IonicPageModule.forChild(MyAccountPage),
        ComponentsModule,StarRatingModule,
        TranslateModule.forChild()
    ],
})
export class MyAccountPageModule {}
