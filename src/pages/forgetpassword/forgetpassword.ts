import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { UtilProvider } from '../../providers/util/util';
import { User } from '../../providers';
import { HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  forgetForm: FormGroup;
  passwordNotMatch:any;
  private signupErrorString: string;
  otp_manage:boolean=false;
  send_otp:boolean=true;
  params:any;
  error_messages = {

    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email address." }
    ],
    // otp: [
    //   { type: "required", message: "Password is required." }
    // ],
  };
  constructor( public user: User,public util: UtilProvider,   public formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {
      this.forgetForm = this.formBuilder.group(
        {
          email: new FormControl(
            "",
            Validators.compose([
              Validators.required,
              Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
            ])
          ),
          otp: new FormControl(""),
        },
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  sendotp(){
    this.otp_manage=true;
    this.send_otp=false;
      this.params = {
        "email": this.forgetForm.value.email
      }
  
      const headers = new HttpHeaders({
        "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
        "X-Oc-Session": localStorage.getItem('sessionid')
      })
      this.util.presentLoading();
      this.user.forgetpassword(this.params,{ headers: headers }).then((result) => {
        this.util.dismissLoading();
        this.util.presentToast(result['message']);
        // this.viewCtrl.dismiss();
        // this.navCtrl.push('MenuPage');
      })
      .catch(error =>{
        this.util.presentToast(error['error'][0]);
      })
  }
    // this.util.presentToast('Otp sent successfully');

  submit(){
    console.log(this.forgetForm.value,"this.forgetForm.value");
    this.navCtrl.push('ChangepasswordPage');
  }

  back(){
    // this.d
  }
}
