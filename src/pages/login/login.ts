import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { User } from '../../providers';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { getServerPath } from '../../providers/api/api';
import { UtilProvider } from "../../providers/util/util";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  myemail: any;
  mypassword: any;
  isChecked: boolean = false;
  public apiUrl = getServerPath();
  params: any;
  loginForm: FormGroup;
  sessionid: any;
  error_messages = {
    email: [
      { type: "required", message: "*Email is required." },
      { type: "pattern", message: "*Please enter a valid email address." }
    ],

    password: [
      { type: "required", message: "*Password is required." }
    ],
  };
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  constructor(
    public storage: Storage,
    public util: UtilProvider,
    public viewCtrl: ViewController,
    private http: HttpClient,
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public formBuilder: FormBuilder) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.loginForm = this.formBuilder.group(
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
          ])
        ),
      },
    );
  }

  ngOnInit() {
    this.getSessionid();
    this.getmy();
  }

  // navigate to forget password page
  forgetpassword() {
    this.navCtrl.push('ForgetpasswordPage');
  }

  // get method for generate session id
  getSessionid() {
    let h = new HttpHeaders().append('X-Oc-Merchant-Id', 'KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H');
    return new Promise((resolve, reject) => {
      this.http.get("http://modhish.xyz/almahaopt/api/rest/session", { headers: h }).subscribe(result => {
        console.log('result', result);
        var data = result['data']['session'];
        localStorage.setItem('sessionid', data);
      },
        err => {
          reject(err);
        }
      );
    });
  }

  // navigate to signup page for new user
  signUp() {
    this.navCtrl.push('SignupPage');
  }

  // Attempt to login in through our User service
  doLogin() {
    console.log(this.loginForm.value, "this.loginForm.value")
    this.params = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }

    let headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.loginUser(this.params, { headers: headers }).then((result) => {
      console.log("result+++",result);
      this.util.dismissLoading();
      let response: any = result;
      this.storage.set('userData', JSON.stringify(response.data));
      this.util.presentToast("Login Successfully");
      this.navCtrl.push('MenuPage');
    })
      .catch(error => {
        console.log("error",error);
        this.util.presentToast(error['error'][0]);
      })
  }

  rememberMe() {
    this.isChecked = !this.isChecked;
    console.log("hello", this.isChecked);
    if (this.isChecked == true) {
      this.storage.set('emails', this.loginForm.value.email);
      this.storage.set('passwords', this.loginForm.value.password);
      this.storage.clear();
    }
  }

  getmy() {
    this.storage.get('emails').then(data => {
      this.myemail = data;
      console.log(this.myemail, "email");
    })
    this.storage.get('passwords').then(data => {
      this.mypassword = data;
      console.log(this.mypassword, "password");
    })
  }
}
