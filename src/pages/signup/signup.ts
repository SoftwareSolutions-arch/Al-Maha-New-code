import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ViewController } from 'ionic-angular';
import { User } from '../../providers/';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getServerPath } from '../../providers/api/api';
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public apiUrl = getServerPath();
  signupForm: FormGroup;
  passwordNotMatch: any;
  private signupErrorString: string;
  params: any;

  error_messages = {

    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email address." }
    ],

    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum password length should be 8." },
      { type: "maxlength", message: "Maximum password length should be 12." }
    ],
    confirmpassword: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum password length should be 8." },
      { type: "maxlength", message: "Maximum password length should be 12." }
    ]
  };
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings

  constructor(
    public util: UtilProvider,
    public viewCtrl:ViewController,
    private http: HttpClient,
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public formBuilder: FormBuilder,
  ) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.signupForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        ),
        confirmpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required, this.equalto('password'),
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        )
      },
      {
        validators: this.password.bind(this)
      }
    );
  }

  // method for comparsion password and confirm password
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  //getting value of password and confirm password
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirmpassword");
    console.log("password", password, "confirmPassword", confirmPassword)
    if (password === confirmPassword) {
      this.passwordNotMatch = ""
    } else {
      this.passwordNotMatch = "password not match"
    }
  }

  //if already have account navigate to Loginpage
  doLogin() {
    this.navCtrl.push('LoginPage');
  }

  // signup for new user
  signUp() {
    this.params = {
      "email": this.signupForm.value.email,
      "password": this.signupForm.value.password,
      "confirm": this.signupForm.value.confirmpassword,
      "firstname": "umang",
      "lastname": "chopra",
      "telephone": "1-541-754-3010",
      "customer_group_id": "1",
      "agree": "1",
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
    this.util.presentLoading();
    this.user.regiUser(this.params,{ headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.util.presentToast("User Registered successfully");
      this.viewCtrl.dismiss();
      this.navCtrl.push('LoginPage');
      console.log(result,"result");
    })
    .catch(error =>{
      this.util.presentToast(error['error']['error'][0]);
    })
  }
}
