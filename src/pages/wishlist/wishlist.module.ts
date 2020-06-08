import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishlistPage } from './wishlist';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(WishlistPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class WishlistPageModule {}
