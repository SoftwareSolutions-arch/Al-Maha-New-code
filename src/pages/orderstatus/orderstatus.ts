import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
@IonicPage()
@Component({
  selector: 'page-orderstatus',
  templateUrl: 'orderstatus.html',
})
export class OrderstatusPage {

  title = "My Orders";

  constructor(  public user: Api,
    private http: HttpClient,
    public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderstatusPage');
  }

  ngOnInit(){
    this.getorderStatus();
  }
  editReview(){
    this.navCtrl.push('ReviewPage');
  }
  // get payment method
  getorderStatus() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.orderStatus({ headers: headers }).then((result) => {
      console.log(result, "getpaymentmethod");
      this.util.dismissLoading();
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }
}
