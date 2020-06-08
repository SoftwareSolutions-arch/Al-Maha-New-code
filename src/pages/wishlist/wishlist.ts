import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import swal from "sweetalert2";
/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  title = "Wishlist";
  allwishlishproducts: any;
  wishlistid: any;
  wishlishlength: any;
  constructor(
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

  ngOnInit(){
    this.getWishlist();
  }

  // get wishlist details through our User service
  getWishlist() {
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.getWishlistdetails({ headers: headers }).then((result) => {
        this.util.dismissLoading();
        this.wishlishlength=result['data']['length'];
        if (this.wishlishlength !=0) {
          this.allwishlishproducts = result['data'];
        }
        else {
          this.allwishlishproducts = [];
        }
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
  }

    // delete wishlist details through our User service
    deleteWishlist(wishlistitem) {
      this.wishlistid=wishlistitem.product_id
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.deleteWishlistdetails(this.wishlistid,{ headers: headers }).then((result) => {
        this.util.dismissLoading();
        this.getWishlist();
        console.log("wishlsit details", result);
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
  }

}
