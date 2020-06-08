import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { User, Api } from '../../providers';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  cartList: any = [];
  isCartListEmpty: boolean = false;

  params: any;
  firstname: any;
  lastname: any;
  telephone: any;
  constructor(
    public util: UtilProvider,
    public user: User,
    public viewCtrl: ViewController,
    private http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public users: Api,
  ) {
  }

  ngOnInit() {
    this.getCartitems();
    this.getAccuntDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  editProfile(): void {
    this.navCtrl.push('ProfilePage', { isEdit: true });
  }

  // get account details through our User service
  getAccuntDetails() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.accountdetails({ headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.firstname = result['data']['firstname'];
      this.lastname = result['data']['lastname'];
      this.telephone = result['data']['telephone'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //getting all availble items in the cart
  getCartitems() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.users.getcartitems({ headers: headers }).then((result) => {
      this.cartList = result['data']['products'];
      (this.cartList && this.cartList.length > 0) ? this.isCartListEmpty = false : this.isCartListEmpty = true;
    })
      .catch(error => {
        console.log(error, "error")
        this.util.presentToast(error['error']['error'][0]);
      })
  }

    // navigate to delivery address page
  buyNow() {
      this.navCtrl.push('DeliveryaddressPage')
  }
}
