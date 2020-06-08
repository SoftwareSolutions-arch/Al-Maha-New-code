import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPage } from './review';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReviewPage
  ],
  imports: [
    IonicPageModule.forChild(ReviewPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class ReviewPageModule {}
