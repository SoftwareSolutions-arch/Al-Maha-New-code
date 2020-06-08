import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from "../index";
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import { HeaderComponent } from '../../components/header/header';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  sidemenuList:any=[];
  @ViewChild(HeaderComponent) header: HeaderComponent;
  footer_item: boolean = false;
  sortbyvalue: any;
  sortbylimits: any;
  p: number = 1;
  filterBar: boolean = false;
  products: any = [];
  productList: any = [];
  value: any;
  params: any;
  sidemenuitems: any;
  sideItems: any;
  categoryname: any;
  categoryimage: any;
  scrollIndex = 0;
  constructor(
    public user: Api,
    private http: HttpClient,
    public util: UtilProvider,
    private socialSharing: SocialSharing, private callNumber: CallNumber,
    public navCtrl: NavController, public navParams: NavParams) {
    this.value = navParams.get('Pagename');
    console.log("Pagename++++++++++++++++++++++++", this.value);
    for (let i = 0; i < 5; i++) {
      this.products.push(this.products.length);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  ngOnInit() {
    this.productsdetail();
    this.getCategories();
  }

  ionViewWillEnter() {
    this.header.ngOnInit();
  }

  // sort Product in Ascending order
  sortProductascending() {
    if (this.sortbyvalue == 2) {
      this.products.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
    if (this.sortbyvalue == 3) {
      this.products.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
    if (this.sortbyvalue == 4) {
      this.products.sort(function (a, b) {
        var textA = a.price
        var textB = b.price
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
    if (this.sortbyvalue == 5) {
      this.products.sort(function (a, b) {
        var textA = a.price
        var textB = b.price
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
    if (this.sortbyvalue == 8) {
      this.products.sort(function (a, b) {
        var textA = a.model.toUpperCase();
        var textB = b.model.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
    if (this.sortbyvalue == 9) {
      this.products.sort(function (a, b) {
        var textA = a.model.toUpperCase();
        var textB = b.model.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
      this.productList = [];
      for (let i = 0; i < this.scrollIndex; i++) {
        this.productList.push(this.products[i]);
      }
      console.log("this.productList", this.productList)
    }
  }

  productLimitvalue() {
    console.log("length", this.products.length);
    console.log("sortbylimits", this.sortbylimits);
    this.productList = [];
    this.util.presentLoadings();
    for (let i = 1; i <= this.sortbylimits; i++) {
      if (i < this.products.length) {
        this.productList.push(this.products[i]);
      }
    }
    console.log("sortbylimits", this.productList);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation', this.scrollIndex, this.products.length);
    if (this.scrollIndex <= this.products.length) {
      setTimeout(() => {
        for (let i = this.scrollIndex; i <= this.scrollIndex + 10; i++) {
          if (i < this.products.length) {
            this.productList.push(this.products[i]);
          }
        }
        this.scrollIndex = this.scrollIndex + 10;

        console.log('Async operation has ended', this.scrollIndex, this.productList);
        infiniteScroll.complete();
      }, 500);
    }

    else {
      infiniteScroll.complete();
    }
  }

  openFilterBar() {
    this.filterBar = true;
  }

  closeFilterBar() {
    this.filterBar = false;
  }

  openProductDetailPage(allItems) {
    console.log(allItems.id, "allItems.id___=++++")
    localStorage.setItem("productid", allItems.id);
    this.navCtrl.push(ProductDetailPage);
  }

  shareViaEmail(body, subject, to, url) {
    this.socialSharing.shareViaEmail(body, subject, ['info@almahaopt.com.sa'], null).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    })
  }

  opendialpad() {
    this.callNumber.callNumber("920033390", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  // get Products details through our User service
  productsdetail() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoadingss();
    this.user.productsdetails({ headers: headers }).then((result) => {
      this.products = result['data'];
      for (let i = 1; i <= 10; i++) {
        this.productList.push(this.products[i]);
        this.footer_item = true;
      }
      this.scrollIndex = 10;
      this.util.dismissLoading();
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // get category by cateogry id
  getCategories() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.getCategorybyid(this.value, { headers: headers }).then((result) => {
      console.log("myresult", result);
      this.categoryname = result['data']['name'];
      this.categoryimage = result['data']['original_image'];
      this.sidemenuitems = result['data']['filters']['filter_groups'];
      console.log('getCategoryList=================', this.sidemenuitems);
      console.log('getCategoryList22=================', JSON.stringify(this.sidemenuitems));

      // for (let i=0;i< this.sidemenuitems.length; i++){
      //   this.categoryname=this.sidemenuitems[i].name
      //   console.log('itme >>>>>',this.sidemenuitems[i].name);
        
      //   for (let j = 0; j <4; j++) {
      //   console.log("sub items +====",this.sidemenuitems[i].filter[j]);
      //   this.sidemenuList.push(this.sidemenuitems[i].filter[j])
      //   // if (i < this.sidemenuitems.length){
      //   //   this.sidemenuList.push(this.sidemenuitems[i]);s
      //   //   console.log("sideItems***************************************");
      //   // }
      // }
      // }

      // for (let i = 1; i < 5; i++) {
      //   if (i < this.sidemenuitems.length) {
      //     this.sideItems.push(this.sidemenuitems[i]);
      //     console.log("sideItems***************************************");
      //   }
      // }
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  //get filter items
  getfilterItems(subitems) {
    console.log(this.value.category_id, "subitems+++");
    let params = {
      filter_id: subitems.filter_id,
      category_id: this.value.category_id
    };
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.getCategorybyfilter(params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.filterBar = false;
      this.productList = result['data'];
      console.log(this.productList, "this.products+++");
    })
      .catch(error => {
        console.log("error", error)
        // this.util.presentToast(error['error']['error'][0]);
      })
  }
}
