import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import { Api } from '../../providers/api/api';
import swal from "sweetalert2";
declare var google;

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contactForm: FormGroup;
  error_messages = {
    name: [{ type: "required", message: "*Name is required." }],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email address." }
    ],

    mobilenumber: [
      { type: "required", message: "*Mobile number is required." },
      { type: "minlength", message: "*Minimum length should be 10." },
      { type: "maxlength", message: "*Maximum length should be 12 ." }
    ],
    message: [
      { type: "required", message: "*Message is required." },
    ]
  };
  params:any;

  constructor(  public user: Api,
    private http: HttpClient,
    public util: UtilProvider,private socialSharing: SocialSharing, private callNumber: CallNumber,public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.contactForm = this.formBuilder.group(
      {
        name: new FormControl("", Validators.compose([Validators.required])),
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        mobilenumber: new FormControl("", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])
        ),
        message: new FormControl("", Validators.compose([Validators.required])),

      },
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
     let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 24.7108317, lng: 46.6601538 },
      zoom: 15
    });
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


    //add to cart through our User service
    sendquery() {
      this.params = {
        "name": this.contactForm.value.name,
        "email": this.contactForm.value.email,
        "enquiry":this.contactForm.value.message
      }
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.contactwithus(this.params, { headers: headers }).then((result) => {
        console.log(result,"result");
        this.util.dismissLoading();
        swal.fire(
          'ThankYou!',
          'Qurry raised successfully!',
          'success'
        )
        this.navCtrl.push('HomePage');
      })
        .catch(error => {
          this.util.presentToast(error['error']['error'][0]);
        }
        )
    }
}
