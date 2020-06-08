import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ActionSheetController } from 'ionic-angular';
import { User } from '../../providers';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from "../../providers/util/util";
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileForm: FormGroup;
  isEdit: boolean = true;
  base64Image: any;
  picture: any;
  params: any;
  error_messages = {
    name: [{ type: "required", message: "*Name is required." }],
    lastname: [
      { type: "required", message: "*Lastname is required." },
    ],
    address: [
      { type: "required", message: "*Address is required." },
    ],
    mobilenumber: [
      { type: "required", message: "*Mobile number is required." },
      { type: "minlength", message: "*Minimum length should be 10." },
      { type: "maxlength", message: "*Maximum length should be 12 ." }
    ],
    datebirth: [
      { type: "required", message: "*Date of birth is required." },
    ]
  };
  constructor(public util: UtilProvider,
    private http: HttpClient, public user: User, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder,
  ) {
    this.isEdit = this.navParams.data.isEdit;
    console.log('is edit ==', this.isEdit)

    this.profileForm = this.formBuilder.group(
      {
        name: new FormControl("", Validators.compose([Validators.required])),
        lastname: new FormControl("", Validators.compose([Validators.required])),
        address: new FormControl("", Validators.compose([Validators.required])),
        datebirth: new FormControl("", Validators.compose([Validators.required])),
        gender: new FormControl("", Validators.compose([Validators.required])),
        mobilenumber: new FormControl("", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])
        ),
      },
    );
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.user.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.user.aceesGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
  }

  goMenuPage() {
    console.log(this.profileForm.value, "this.profileForm.value.name")
    this.navCtrl.push('MenuPage');
  }

  // signup for new user
  save() {
    console.log("hello edit umang");
    this.params = {
      "firstname": this.profileForm.value.name,
      "lastname": this.profileForm.value.lastname,
      "email": "umangchopra75@gmail.com",
      "telephone": this.profileForm.value.mobilenumber,
      "custom_field": {
        "account": {
          "1": "+364545454"
        }
      }
    }

    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })

    console.log(this.params,"this.params");
    this.util.presentLoading();
    this.user.editAccountdetails(this.params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      console.log(result,"profulefeu;af");
      this.util.presentToast("Account update successfully");
      this.navCtrl.push('HomePage');
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }

  // exit() {
  //   console.log(this.profileForm.value, "this.profileForm.value.name");
  //   this.viewCtrl.dismiss();
  // }
}
