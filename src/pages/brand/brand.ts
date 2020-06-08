import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the BrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {

  constructor(private socialSharing: SocialSharing, private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
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

}
