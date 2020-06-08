import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  params:any;
  title = "My Orders";
  constructor(public user: Api,
    private http: HttpClient,
    public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }

  // navigate to Orderstatus Page 
  orderStatus(){
    this.navCtrl.push('OrderstatusPage')
  }

    // get payment method
    getorderStatus() {
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.myorderdetails( this.params,{ headers: headers }).then((result) => {
        console.log(result, "getpaymentmethod");
        this.util.dismissLoading();
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
    }
}
