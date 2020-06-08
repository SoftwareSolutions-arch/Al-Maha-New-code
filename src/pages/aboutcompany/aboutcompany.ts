import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HeaderComponent} from "../../components/header/header";

/**
 * Generated class for the AboutcompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutcompany',
  templateUrl: 'aboutcompany.html',
})
export class AboutcompanyPage {
  @ViewChild('headerPage') headerPage: HeaderComponent;
    title = "About Company";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutcompanyPage');
  }

}
