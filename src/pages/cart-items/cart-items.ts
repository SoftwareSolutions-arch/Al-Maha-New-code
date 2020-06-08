import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Api } from '../../providers';
import { UtilProvider } from '../../providers/util/util';
import { HeaderComponent } from '../../components/header/header';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the CartItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-items',
  templateUrl: 'cart-items.html',
})
export class CartItemsPage {
  @ViewChild(HeaderComponent) header: HeaderComponent;

  title = "Cart Items";
  cartList: any = [];
  params: any;
  appLanguage:any;
  isCartListEmpty: boolean = false;
  constructor(
    public user: Api,
    private http: HttpClient,public storage: Storage,
    public util: UtilProvider, private alertCtrl: AlertController, 
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.getCartitems();
    this.initTranslate();
    // this.deleteallCartitems();
  }

  initTranslate() {
    this.storage.get('appLanguage').then(data=>{
      this.appLanguage=data;
      console.log('app language from umang ---',data);
    });
  }

  ionViewWillEnter(){
    this.header.ngOnInit();
  }

  // navigate to delivery address page
  buyNow() {
    this.navCtrl.push('DeliveryaddressPage')
  }

  //getting all availble items in the cart
  getCartitems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getcartitems({ headers: headers }).then((result) => {
      console.log(result, "result")
      this.util.dismissLoading();
      this.cartList = result['data']['products'];
      (this.cartList && this.cartList.length > 0) ? this.isCartListEmpty = false : this.isCartListEmpty = true;
    })
      .catch(error => {
        console.log(error, "error")
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //delete all items from the cart
  deleteallCartitems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.deleteallCartitems({ headers: headers }).then((result) => {
      this.util.dismissLoading();
      console.log("getcartitems + result", result);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // delete particular items from the cart
  deleteOneItem(listItems) {
    this.params=listItems.key
    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })

    if(this.appLanguage=='en'){
      let alert = this.alertCtrl.create({
        title: 'Item detail',
        message: 'Do you want to delete this item?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.util.presentLoading();
              this.user.deleteSingleitem(this.params, { headers: headers }).then((result) => {
                this.ngOnInit();
                this.ionViewWillEnter();
                this.util.dismissLoading();
              })
                .catch(error => {
                  console.log(error,"error")
                  this.util.presentToast(error['error'][0]);
                })
            }
          }
        ]
      });
      alert.present();
    }
    
    if(this.appLanguage=='ar'){
      let alert = this.alertCtrl.create({
        title: 'تفاصيل العنصر',
        message: 'هل تريد حذف هذا البند?',
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'حذف',
            handler: () => {
              this.util.presentLoading();
              this.user.deleteSingleitem(this.params, { headers: headers }).then((result) => {
                this.ngOnInit();
                this.ionViewWillEnter();
                this.util.dismissLoading();
              })
                .catch(error => {
                  console.log(error,"error")
                  this.util.presentToast(error['error'][0]);
                })
            }
          }
        ]
      });
      alert.present();
    }
  }
}
