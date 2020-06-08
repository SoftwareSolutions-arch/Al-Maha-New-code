import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import { HeaderComponent } from '../../components/header/header';
import { Storage } from "@ionic/storage";

@IonicPage()

@Component({
  selector: 'page-deliveryaddress',
  templateUrl: 'deliveryaddress.html',
})

export class DeliveryaddressPage {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  selectaddressid: any
  deliveryadd: boolean = true;
  editaddressdetail: boolean = false;
  addressList: any = [];
  addressid: any;
  params: any;
  appLanguage: any;
  constructor(
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider, private alertCtrl: AlertController, public storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryaddressPage');
  }

  ngOnInit() {
    this.getDeliveryAddress();
    this.initTranslate();
  }

  initTranslate() {
    this.storage.get('appLanguage').then(data => {
      this.appLanguage = data;
      console.log('app language from delieryaddress ---', data);
    });
  }

  ionViewWillEnter() {
    this.header.ngOnInit();
  }

  // get all account address
  getDeliveryAddress() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    // this.util.presentLoading();
    this.user.getAddress({ headers: headers }).then((result) => {
      this.addressList = result['data']['addresses'];
      console.log("addressList =======", this.addressList);

    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //get selected check box value for address
  selectAddress() {
    console.log(this.selectaddressid)
    this.addressid = this.selectaddressid;
  }

  confirmAddress() {
    this.confirmPaymentAddress();
    // this.confirmShippingAddress();
  }

  // set address for confirm
  confirmPaymentAddress() {
    localStorage.setItem("addressid", this.addressid);
    if (this.addressid) {
      this.params = {
        "address_id": this.addressid
      }
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.user.confirmPaymentAddress(this.params, { headers: headers }).then((result) => {
        this.confirmShippingAddress();
        console.log(result, "result_+++");
      }
      )
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        }
        )
    }
    else {
      this.util.addressAlertData();
    }
  }

  // set address for shipping address
  confirmShippingAddress() {
    this.params = {
      "address_id": this.addressid
    }
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.confirmShippingaddress(this.params, { headers: headers }).then((result) => {
      // this.navCtrl.push('OrdersummaryPage');
      this.navCtrl.push('OrdersummaryPage');
      console.log(result, "confirmshippingaddressconfirmshippingaddressconfirmshippingaddress+++");
    }
    )
      .catch(error => {
        // this.util.presentToast(error['error']['error'][0]);
      }
      )
  }

  //move to edit address page
  editAddress() {
    this.navCtrl.push('EditaddressPage');
  }

  //navigate to add address page
  addAddress() {
    this.navCtrl.push('MyaddressPage');
  }

  // delete existing address
  deleteAddress(addressList) {
    this.params = {
      "address_id": addressList.address_id
    }
    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    if (this.appLanguage == 'en') {
      let alert = this.alertCtrl.create({
        title: 'Confirm delete address',
        message: 'Do you want to delete this address?',
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
              this.user.deleteAddress(this.params, { headers: headers }).then((result) => {
                this.ngOnInit();
                console.log(result, "delte result")
              })
                .catch(error => {
                  this.util.presentToast(error['error']['error'][0]);
                })
            }
          }
        ]
      });
      alert.present();
    }
    if (this.appLanguage == 'ar') {
      let alert = this.alertCtrl.create({
        title: 'أكد حذف العنوان',
        message: 'هل تريد حذف هذا العنوان?',
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
              this.user.deleteAddress(this.params, { headers: headers }).then((result) => {
                this.ngOnInit();
                console.log(result, "delte result")
              })
                .catch(error => {
                  this.util.presentToast(error['error']['error'][0]);
                })
            }
          }
        ]
      });
      alert.present();
    }
  }
}
