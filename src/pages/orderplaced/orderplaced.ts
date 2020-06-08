import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the OrderplacedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderplaced',
  templateUrl: 'orderplaced.html',
})
export class OrderplacedPage {
  myaddress: any;

  // title = "Wishlist";
  constructor(
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  cancelOrder(){
    this.navCtrl.push('OrderCancelPage')
  }

  continue(){
    this.navCtrl.setRoot('MenuPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderplacedPage');
  }

  ngOnInit(){
    this.getConfirmAddress();
  }

  // selcted delivery address for orderplaced
  getConfirmAddress(){
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getSelectedaddress({ headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.myaddress = result['data']['address_1'];
      console.log("shipping++++++", result);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }
}
