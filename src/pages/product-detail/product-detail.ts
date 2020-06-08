import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Header } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import { Slides } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { HeaderComponent } from '../../components/header/header';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  _imageViewerCtrl: ImageViewerController;
  @ViewChild(HeaderComponent) header: HeaderComponent;
  @ViewChild(Slides) topSlides: Slides;

  itemSelected: string = "Item Specifics";
  params: any;
  productsimagesfirst: any;
  productsimagessecond: any;
  myProducts: any = {}
  qty: any = 1;

  allrelatedproducts: any;
  cartitems: any;
  itemdeails: any;
  attributedeails: any;
  reviewtotal: any;
  isitemReview: boolean = false;
  constructor(
    imageViewerCtrl: ImageViewerController,
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider,
    private socialSharing: SocialSharing, private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams) {
    this._imageViewerCtrl = imageViewerCtrl;

  }

  ionViewWillEnter() {
    this.header.ngOnInit();
  }

  presentImage(myImage) {
    console.log("helo imang")
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 4000);
    imageViewer.onDidDismiss(() => console.log("image dismisssed"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  ngOnInit() {
    this.getProductid();
    this.relatedProducts();
  }

  topSlideChanged() {
    this.topSlides.startAutoplay();
  }

  // slide move to next
  next() {
    this.topSlides.slideNext();
  }

  // contact with us via gmail
  shareViaEmail() {
    this.socialSharing.shareViaEmail('body', 'subject', ['info@almahaopt.com.sa'], null).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    })
  }

  // open dialpad in mobile
  opendialpad() {
    this.callNumber.callNumber("920033390", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  // get Products details bt id through our User service
  getProductid() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getProductbyid({ headers: headers }).then((result) => {
      console.log(result, "this.getProductidgetProductid++++");
      this.util.dismissLoading();
      this.myProducts = result['data'];
      this.productsimagesfirst = result['data']['images'][0];
      this.productsimagessecond = result['data']['images'][1];
      result['data']['attribute_groups'][0] ? this.itemdeails = result['data']['attribute_groups'][0]['attribute'] : false;
      result['data']['attribute_groups'][1] ? this.attributedeails = result['data']['attribute_groups'][1]['attribute'] : false;
      this.reviewtotal = result['data']['reviews']['review_total'];
      if (this.reviewtotal > 1) {
        this.isitemReview = true
      }
    })
      .catch(error => {
        console.log(error, "error")
        // this.util.presentToast(error['error']['error'][0]);
      })
  }

  // increment product qty
  incrementQty() {
    console.log(this.qty + 1);
    this.qty += 1;
  }

  // decrement product qty
  decrementQty() {
    console.log(this.qty, "this.qty")
    if (this.qty - 1 < 1) {
      this.qty = 1;
      console.log("->" + this.qty);
    } else {
      this.qty -= 1;
      console.log("2->" + this.qty);
    }
  }

  // get Products details through our User service
  relatedProducts() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    // this.util.presentLoading();
    this.user.getRelatedProductsbyid({ headers: headers }).then((result) => {
      // this.util.dismissLoading();
      console.log("related + result", result);
      this.allrelatedproducts = result['data'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // open Products details through our User service
  openProductDetailPage(relatedproduct) {
    console.log(relatedproduct.product_id, "relatedproduct.idmyiddd=++++");
    localStorage.setItem("productid", relatedproduct.product_id);
    this.navCtrl.push(ProductDetailPage);
  }

  //add to cart through our User service
  addtoCart() {
    this.params = {
      "product_id": localStorage.getItem('productid'),
      "quantity": this.qty
    }
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.addtoCart(this.params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      if (result['success'] == 1) {
        this.util.presentToast("Item added successfully");
        this.cartitems = result['data'];
        // this.header.increaseCartItems();
        this.header.ngOnInit();
      }
    })
      .catch(error => {
        console.log("error", error);
        this.util.presentToast(error['error']['error'][0]);
      }
      )
  }

  //products add on wishlist
  addToWishlist() {

    this.params = {
      "product_id": localStorage.getItem('productid'),
    }

    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid'),
    })

    this.util.presentLoading();
    this.user.addtomyWishlist(this.params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      console.log(result, "result+++");
      if (result['success'] == 1) {
        this.util.presentToast("Item added in Wishlist");
      }
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      }
      )
  }

  addToCompare() {
    console.log(localStorage.getItem('sessionid'), "newcases+++");
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid'),

    })

    // let headers = new Headers();
    // headers.append('X-Oc-Merchant-Id','KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H');
    // headers.append('X-Oc-Session', localStorage.getItem('sessionid'));

    this.util.presentLoading();
    this.user.addToCompareList({ headers: headers }).then((result) => {
      console.log(result, "result+++");
      if (result['success'] == 1) {
        this.util.presentToast("Item added in compare list");

      }
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      }
      )
  }
}
