import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api, Items, User } from '../../providers';
import { ProductDetailPage } from "../index";
import { HeaderComponent } from '../../components/header/header';
import { Platform } from 'ionic-angular/platform/platform';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  dark:any='';
  subscription: any;
  @ViewChild(HeaderComponent) header: HeaderComponent;
  name: any;
  @ViewChild(Slides) topSlides: Slides;
  topImageContainer = [
    { url: "assets/img/banner.png" },
    { url: "assets/img/banner2.png" },
    { url: "assets/img/banner3.png" },
    { url: "assets/img/banner4.png" },
  ];
  centerImageContainer = [
    { url: "assets/img/Mask Group 5.png" },
    { url: "assets/img/banner1-horizontal.jpg" }
  ];
  categories: any = [];
  trendingItemList: any = [];

  constructor(
    private platform: Platform,
    private http: HttpClient,
    public util: UtilProvider,
    public user: Api,
    public users: User,
    private socialSharing: SocialSharing, private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams) {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (window.confirm("Do you want to exit from app")) {
        navigator['app'].exitApp();
      }
    })
    this.dark = users.getTheme();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  // ngOnInit() {
  //   this.categorydetails();
  //   this.trendingItems();
  // }

  ionViewWillEnter() {
    this.header.ngOnInit();
    this.categorydetails();
    this.trendingItems();
  }

  topSlideChanged() {
    this.topSlides.startAutoplay();
  }

  ionViewDidLoad() {
  }

  next() {
    this.topSlides.slideNext();
  }

  // navigate to ProductList Page
  productListPage(categoryItems) {
    console.log(categoryItems.category_id, "categoryItemscategoryItemscategoryItemscategoryItemscategoryItemscategoryItems");
    let params = {
      category_id: categoryItems.category_id,
    };
    this.navCtrl.setRoot('ProductListPage', { Pagename: params });
  }

  //share via Email
  shareViaEmail() {
    this.socialSharing.shareViaEmail('body', 'subject', ['info@almahaopt.com.sa'], null).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    })
  }

  // open dialpad for calling a given number
  opendialpad() {
    this.callNumber.callNumber("920033390", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  // get category through our User service
  categorydetails() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.categoriesdetails({ headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.categories = result['data'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // get list of all trending items
  trendingItems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.trendingItems({ headers: headers }).then((result) => {
      this.trendingItemList = result['data'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //get details of trending items
  trendingListdetails(trendingItems) {
    localStorage.setItem("productid", trendingItems.product_id);
    this.navCtrl.push(ProductDetailPage);
  }
}
