import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { Settings, User } from '../../providers';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  laguage: any;
  isNightMode:boolean=false;
  constructor(public navCtrl: NavController, private translate: TranslateService, public storage: Storage, public user: User,
    public events: Events) {
    storage.get('appLanguage').then(data => {
      if (data) {
        this.translate.use(data);
        this.laguage = data;
      } else {
        this.translate.use('en');
        this.laguage = 'en';
      }
    })
  }
  
  ngOnInit(){
    let data=localStorage.getItem('mynightmode');
    console.log("data",data);
    if(data=='true'){
      this.isNightMode=true;
    }
  }

  changeTheme(data) {
    console.log('change theme called !!!!', data.value);
    localStorage.setItem('mynightmode',data.value);
    this.storage.set('isNightMode', data.value);
    if (data.value) {
      this.user.setTheme('dark');
      this.events.publish('setDarkTheme', 'dark');
    } else {
      this.user.setTheme('');
      this.events.publish('setDarkTheme', '');
    }
  }

  selectLanguage() {
    console.log('select language called !!', this.laguage);
    if (this.laguage == 'en') {
      this.translate.use('en');
      this.storage.set('appLanguage', 'en').then(() => {
        this.events.publish('appLanguage', 'en');
      });
    } else {
      this.translate.use('ar');
      this.storage.set('appLanguage', 'ar').then(() => {
        this.events.publish('appLanguage', 'ar');
      });
    }

  }

  ionViewDidLoad() {
  }

  changepassword() {
    this.navCtrl.push('ChangepasswordPage');
  }

  //delete Account
  deleteaccount(allItems) {
    // let formData = new FormData();
    swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you will not be able to recover this.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.navCtrl.push('SignupPage');
        swal.fire(
          'Deleted!',
          'Your account has been deleted.',
          'success'
        )
        // this.http.post("https://www.indimedo.com/api/removeCartItem", formData).subscribe(data => {
        //   this.ionViewWillEnter();
        //   if (data) {
        //     this.ionViewWillEnter();
        //     swal.fire(
        //       'Deleted!',
        //       'Your file has been deleted.',
        //       'success'
        //     )
        //   }
        // }
        // )
      }
      else {
        swal.fire('Your account is safe!')
      }
    });
  }

  //change Address
  changeAddress() {
    this.navCtrl.push('DeliveryaddressPage');
  }
}
