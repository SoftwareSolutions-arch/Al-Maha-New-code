import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import { FCM } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-paynow',
  templateUrl: 'paynow.html',
})
export class PaynowPage {
  selectpayment: any
  paymentmethod: any;
  params: any;
  shippingcode: any;
  firebaseToken: any;
  constructor(
    private localNotifications: LocalNotifications,
    private fcm: FCM,
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.fcm.getToken().then(token => {
      this.firebaseToken = token;
      console.log("token", token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log("data Notification", data);
      if (data.wasTapped) {
        console.log("Received in background");
        this.localNotifications.schedule({
          title:data.title,
          text: data.body
        });
      } else {
        console.log("Received in foregroundsssz");
        this.localNotifications.schedule({
          title:data.title,
          text: data.body
        });
      }
    })
  }

  selectPaymentmethod() {
    console.log(this.selectpayment)
    this.paymentmethod = this.selectpayment;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaynowPage');
  }

  ngOnInit() {
    this.getPaymentMethod();
  }

  // get Shipping method
  getShippingMethod() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.getShippingMethod({ headers: headers }).then((result) => {
      this.shippingcode = result['data']['shipping_methods'][0]['quote'][0]['code'];
      console.log("getShippingMethod++++++", result['data']['shipping_methods'][0]['quote'][0]['code']);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // set Shipping method
  setShippingMethod() {
    console.log(this.paymentmethod, "this.paymentmethod");
    if (this.paymentmethod == 'payfortvisa') {
      this.params = {
        "shipping_method": this.shippingcode,
        "comment": "string"
      }
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      console.log(this.params, "this.params+++");
      this.user.setShippingMethod(this.params, { headers: headers }).then((result) => {
        this.setPaymentMethod();
        console.log('setShippingMethod++++++', result);
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
    }

    if (this.paymentmethod == 'cashondelivery') {
      this.navCtrl.push('OrderplacedPage');
    }
  }

  // get payment method
  getPaymentMethod() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getPaymentMethod({ headers: headers }).then((result) => {
      console.log(result, "getpaymentmethod");
      this.getShippingMethod();
      this.util.dismissLoading();
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // set payment method
  setPaymentMethod() {
    console.log(this.paymentmethod, "this.paymentmethod");
    if (this.paymentmethod == 'payfortvisa') {
      this.params = {
        "payment_method": "payfort_fort",
        "agree": "1",
        "comment": "string"
      }
      let headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.user.setPaymentMethod(this.params, { headers: headers }).then((result) => {
        console.log('setPaymentMethod++++++', result);
        this.overviewOrder();
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
    }

    if (this.paymentmethod == 'cashondelivery') {
      this.navCtrl.push('OrderplacedPage');
    }
  }

  // Get an overview of the order
  overviewOrder() {
    // this.params = {
    //   "firebaseToken": this.firebaseToken
    // }

    let formdata = new FormData();
    formdata.append('firebaseToken',this.firebaseToken)
    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    console.log("my params value", this.params);
    this.user.confirmOrder(formdata, { headers: headers }).then((result) => {
      this.navCtrl.push('CreatepaymentpagePage');
      console.log('confirmOder++++++', result);
    })
      .catch(error => {
        console.log(error, "error")
        this.util.presentToast(error['error'][0]);
      })
  }
}
