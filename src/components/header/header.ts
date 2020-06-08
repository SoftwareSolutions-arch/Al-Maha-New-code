import { Component, Input } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import { ProductDetailPage } from '../../pages';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  cartLength: number = 0;
  inputbox: any;
  @Input()
  isBackButtonEnable: boolean = false;

  @Input()
  currentPage: string = '';

  @Input()
  title: any = '';

  public options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 5,
    slidePixels: 20,
    iosdelay: 100,
    androiddelay: 150,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
  };
  searchproduct: any = [];
  myitemLength: number = 0;
  isCartListEmpty: boolean = false;

  constructor(public storage: Storage,
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeaderPage');
  }

  setBackButtonEnable() {
    // console.log("seBackButtonenable from parent class !!!!!");
    this.isBackButtonEnable = true;
  }

  setBackButtonDisable() {
    this.isBackButtonEnable = false;
  }

  increaseCartItems() {
    this.cartLength = this.cartLength + 1;
  }

  ngOnInit() {
    this.getCartitems();
  }

  searchbox() {
    this.inputbox = !this.inputbox;
  }

  hideserachbox() {
    this.inputbox = false;
  }

  toggleMenu() {
    this.menuCtrl.toggle();
    this.inputbox = false;

  }

  openWishList() {
    this.inputbox = false;

    if (this.currentPage != 'WishlistPage') {
      this.nativePageTransitions.fade(null);
      this.navCtrl.push('WishlistPage', {}, { animate: false })
    }

  }
  openCartItemsPage() {
    this.inputbox = false;

    if (this.currentPage != 'CartItemsPage') {
      this.nativePageTransitions.fade(null);
      this.navCtrl.push('CartItemsPage', {}, { animate: false })
    }
  }
  openNotificationPage() {
    this.inputbox = false;

    if (this.currentPage != 'NotificationPage') {
      this.nativePageTransitions.fade(null);
      this.navCtrl.push('NotificationPage', {}, { animate: false })
    }

  }

  // get searched products
  getItems(event) {
    var val = event.target.value;
    console.log(val, "valueotems+++");
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.getSearchProducts(val, { headers: headers }).then((result) => {
      this.searchproduct = result['data'];
      console.log("searched + result", this.searchproduct);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //search item list
  searchItemdetails(allItems) {
    console.log(allItems, "trendingItems");
    localStorage.setItem("productid", allItems.product_id);
    this.navCtrl.push(ProductDetailPage);
  }

  //getting all availble items in the cart
  getCartitems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.getcartitems({ headers: headers }).then((result) => {
      if (result['data']['total_product_count'] > 0) {
        this.myitemLength = result['data']['total_product_count']
      }
      else {
        this.myitemLength = 0;
      }

      console.log("total_product_count", this.myitemLength);
    })
      .catch(error => {
        console.log(error, "error");
      })
  }
}
