import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaddressPage } from './editaddress';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaddressPage),
    TranslateModule.forChild()

  ],
})
export class EditaddressPageModule {}
