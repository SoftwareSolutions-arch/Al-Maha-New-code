import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ProductListPage),
    TranslateModule.forChild()
  ],
})
export class ProductListPageModule {}
