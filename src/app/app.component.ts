import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Events } from 'ionic-angular';
import { Settings, User } from '../providers';
import { Storage } from "@ionic/storage";
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  rootPage = '';
  // rootPage = 'DeliveryaddressPage';
  @ViewChild(Nav) nav: Nav;
  dark: any='';

  constructor(
    private fcm: FCM,
    public storage: Storage,public user:User,public events:Events,
    private translate: TranslateService, platform: Platform, settings: Settings, 
    private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      storage.get('userData').then(data => {
        if (data) {
          this.rootPage = 'MenuPage';
        } else {
          this.rootPage = 'LoginPage'
        }
      })
    });
    this.initTranslate();
    storage.get('isNightMode').then(data=>{
      if(data){
        this.user.setTheme('dark');
        this.dark = 'dark'
      }else {
        this.user.setTheme('');
        this.dark = ''
      }
    });
    events.subscribe('setDarkTheme', (value) => {
      console.log('setDarkTheme >>>>>',value);
      this.dark = value;
    });
    events.subscribe('appLanguage', (value) => {
      this.initTranslate();
    });
  }

  initTranslate() {
    this.storage.get('appLanguage').then(data=>{
      console.log('app language from storage ---',data);
      if(data && data == 'ar'){
        this.translate.setDefaultLang('ar');
        this.translate.use('ar');
      }else {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
      }
      this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
      });
    });
  }

  ionViewDidLoad(){
    this.fcm.onNotification().subscribe(data => {
      console.log("data Notification",data);
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foregroundsssz");
      }
    })
  }
}
    