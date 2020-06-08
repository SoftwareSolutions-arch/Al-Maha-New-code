import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartItemsPage } from './cart-items';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CartItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(CartItemsPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class CartItemsPageModule {}
