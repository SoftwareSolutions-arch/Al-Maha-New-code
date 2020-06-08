import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import {StarRatingModule} from "ionic3-star-rating";
import {ComponentsModule} from "../../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
    imports: [
        IonicPageModule.forChild(ProductDetailPage),
        StarRatingModule,
      ComponentsModule,
      TranslateModule.forChild()
    ],
})
export class ProductDetailPageModule {}
