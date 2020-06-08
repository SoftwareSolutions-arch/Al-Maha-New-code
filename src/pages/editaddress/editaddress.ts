  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { HttpClient, HttpHeaders } from "@angular/common/http";
  import { UtilProvider } from '../../providers/util/util';
  import { Api } from '../../providers/api/api';
  import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

  @IonicPage()
  @Component({
    selector: 'page-editaddress',
    templateUrl: 'editaddress.html',
  })
  export class EditaddressPage {

    selectaddressid: any;
    addressList: any;
    addressid: any;
    isEditForm: boolean = false;
    isgetForm: boolean = true;
    addressForm: FormGroup;

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
    params: any;
    constructor(public user: Api,
      private http: HttpClient,
      public util: UtilProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
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
      console.log('ionViewDidLoad EditaddressPage');
    }

    ngOnInit() {
      this.getDeliveryAddress();
    }

    // get all shipping address
    getDeliveryAddress() {
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.getAddress({ headers: headers }).then((result) => {
        this.util.dismissLoading();

        this.addressList = result['data']['addresses'];
        console.log("addressList-------", this.addressList);

      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        })
    }

    selectAddress() {
      this.addressid = this.selectaddressid;
      localStorage.setItem('editaddressid', this.addressid);
    }

    // open edit address form
    editAddressform() {
      if (this.addressid) {
        this.patchAddressdetails();
      }
      else {
        this.util.addressAlertData();
      }
    }

    //edit shiping address
    saveAddress() {
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
        },
        "default": 0
      }
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.editAddress(this.params, { headers: headers }).then((result) => {
        this.util.dismissLoading();
        this.addressForm.reset();
        this.util.presentToast("Address update successfully");
        this.navCtrl.push('DeliveryaddressPage');
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        }
        )
    }

    // patch delivery address for edit
    patchAddressdetails() {
      var addresskey = localStorage.getItem('editaddressid');
      if (addresskey) {
        const headers = new HttpHeaders({
          "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
          "X-Oc-Session": localStorage.getItem('sessionid')
        })
        // this.util.presentLoading();
        this.user.editSelectedaddress({ headers: headers }).then((result) => {
          console.log("result", result);
          this.addressList = result['data'];
          this.isEditForm = true;
          this.isgetForm = false;
          // console.log("patchAddressdetails++++++", this.myaddress);
        })
          .catch(error => {
            this.util.presentToast(error['error']['error'][0]);
          })
      }
    }
  }
