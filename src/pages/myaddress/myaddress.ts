import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from "../../providers/util/util";
import { Api } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-myaddress',
  templateUrl: 'myaddress.html',
})
export class MyaddressPage {
  addressForm: FormGroup;
  params: any;
  error_messages = {
    firstname: [
      { type: "required", message: "*firstname is required." }
    ],
    lastname: [
      { type: "required", message: "*lastname is required." }
    ],
    city: [
      { type: "required", message: "*city is required." }
    ],
    address1: [
      { type: "required", message: "*address1 is required." }
    ],
    postalcode: [
      { type: "required", message: "*Password is required." }
    ],
  };
  myaddress = {};

  constructor(
    public user: Api,
    public util: UtilProvider, private http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group(
      {
        firstname: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        lastname: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        city: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        address1: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        address2: new FormControl(""),
        postalcode: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      },
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaddressPage');
  }

  ngOnInit() {
  }

  //  add account address
  addAddress() {
    this.params = {
      "firstname": this.addressForm.value.firstname,
      "lastname": this.addressForm.value.lastname,
      "city": this.addressForm.value.city,
      "address_1": this.addressForm.value.address1,
      "address_2": this.addressForm.value.address2,
      "postcode": this.addressForm.value.postalcode,
      "country_id": "81",
      "zone_id": "1256",
      "company": "Demo Company name",
      "custom_field": {
        "address": {
          "3": "demo address 3"
        }
      }
    }
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })

    this.util.presentLoading();
    this.user.addNewaddress(this.params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.addressForm.reset();
      this.util.presentToast("Address added successfully");
      this.navCtrl.push('DeliveryaddressPage');
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      }
      )
  }
}
