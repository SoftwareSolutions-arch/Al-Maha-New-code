import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, Nav, NavController } from 'ionic-angular';
import { HomePage } from "../index";
import { SocialSharing } from '@ionic-native/social-sharing';
import { UtilProvider } from "../../providers/util/util";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../providers';
import { Api, Items } from '../../providers';
import { ProductDetailPage } from "../index";
import {Storage} from "@ionic/storage";

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  categories: any;
  params: any;
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  showSubmenu: boolean = false;
  pages: PageList = [
    { title: 'Home', component: 'TutorialPage' },
    { title: 'Categories', component: 'WelcomePage' },
    { title: 'My order', component: 'TabsPage' },
    { title: 'Brand', component: 'CardsPage' },
    { title: 'Blog', component: 'ContentPage' },
    { title: 'About', component: 'LoginPage' },
    { title: 'Guide & Help', component: 'SignupPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Share App', component: 'MenuPage' },
    { title: 'Rate Us', component: 'SettingsPage' },
    { title: 'Logout', component: 'SearchPage' },
    { title: 'My Orders', component: 'MyordersPage' }
  ]
  userdetails = {};

  constructor(public storage : Storage,public util: UtilProvider, public user: User, public users: Api,

    private socialSharing: SocialSharing,
    public navCtrl: NavController, public menuCtrl: MenuController) {
    // used for an example of ngFor and navigation
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
    this.storage.get('userData').then(data=>{
      let userData = JSON.parse(data)
      if(userData && userData.user_profile !== ''){
        console.log('user profile is ---',userData);
        // this.userImage=userData.user_profile;
      }
      if(userData && userData.user_login){
        // this.fullName = userData.user_login;
      }
    })
    //Open Default Home Page
    // this.openPage({ title: 'Home', pageName: 'TabsPage', index: 0 }, false)
  }

  ngOnInit() {
    this.accuntdetails();
    this.categorydetails();
  }

  openCatgoryePage(allItems) {
    this.menuCtrl.toggle();
    let params = {
      category_id: allItems.category_id,
    };
    this.nav.setRoot('ProductListPage',{Pagename: params});
    // this.nav.setRoot(page.component);
  }

  
  openPage(page: PageItem) {
    this.menuCtrl.toggle();
    this.nav.setRoot(page.component);
  }


  editProfile(): void {
    this.menuCtrl.toggle();
    this.navCtrl.push('ProfilePage', { isEdit: true });
  }
  
  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  // social sharing plugin
  shareapp(message, subject, file, url) {
    // Share via
    this.socialSharing.share('Al-Maha', 'Al-Maha App', null, 'url').then((success) => {
      console.log(success, "success");
      // Success!
    }).catch((error) => {
      console.log(error, "error");
      // Error!
    });
  }

  //get account details
  accuntdetails() {
    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.accountdetails({ headers: headers }).then((result) => {
      this.userdetails = result['data'];
      console.log('this.userdetails', this.userdetails);
      // this.lastname=result['data']['lastname'];
      // this.telephone=result['data']['telephone'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }


  logout() {
    this.menuCtrl.toggle();
    this.storage.set('userData',null);
    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.user.logoutuser(this.params,{ headers: headers }).then((result) => {
      console.log('this.userdetails', result);
      // this.userdetails = result['data'];,
      this.nav.setRoot('LoginPage');
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // get category through our User service
  categorydetails() {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.users.categoriesdetails({ headers: headers }).then((result) => {
      this.categories = result['data'];
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }
}
