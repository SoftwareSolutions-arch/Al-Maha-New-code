import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaddressPage } from './myaddress';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaddressPage),
    TranslateModule.forChild()
  ],
})
export class MyaddressPageModule {}
