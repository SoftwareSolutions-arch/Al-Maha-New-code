import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Api } from '../../providers';
import { UtilProvider } from '../../providers/util/util';
import { HeaderComponent } from '../../components/header/header';

@IonicPage()
@Component({
  selector: 'page-ordersummary',
  templateUrl: 'ordersummary.html',
})
export class OrdersummaryPage {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  quantity = 1;
  // mycartitems: any;
  mycartitems: string[] = [];

  cartamount: any;
  constructor(public user: Api,
    private http: HttpClient,
    public util: UtilProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersummaryPage');
  }

  ngOnInit() {
    this.getCartitems();
    this.updateCart();
  }

  placeOrder() {
    this.navCtrl.push('PaynowPage')
  }

  // increment  product qty
  incrementQty(listItems) {
    console.log(this.quantity + 1);
    listItems.quantity = parseInt(listItems.quantity) + 1;
    console.log(listItems, "listitems")
    this.cartamount = this.cartamount + listItems.price_raw;
    this.updateCart();
    console.log(this.cartamount, "this.cartamount")
  }

  // decrement product qty
  decrementQty(listItems) {
    console.log(listItems.quantity, "listItems.quantity")
    if (listItems.quantity - 1 < 1) {
      listItems.quantity = 1;
      console.log("->" + listItems.quantity);
    } else {
      listItems.quantity -= 1;
      this.cartamount = this.cartamount - listItems.price_raw;
      this.updateCart();
    }
  }

  //getting all availble items in the cart
  getCartitems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getcartitems({ headers: headers }).then((result) => {
      this.util.dismissLoading();
      console.log(result, "result+_+_+_++_")
      this.mycartitems = result['data']['products'];
      this.cartamount = result['data']['total_raw'];
      console.log("getcartitems + result", result['data']['products']);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // update cart items with quantity
  updateCart() {
    this.mycartitems.forEach(item => {
      let params = {
        key: item['key'],
        quantity: item['quantity']
      };
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.user.updateCart(params, { headers: headers }).then((result) => {
        this.header.ngOnInit();
        console.log(result, "updatedcart value");
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
    })
  }
}
