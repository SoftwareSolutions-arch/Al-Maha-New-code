import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UtilProvider } from '../../providers/util/util';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../providers';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  params: any;
  changeForm: FormGroup;
  passwordNotMatch: any;
  error_messages = {
    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum password length should be 8." },
      { type: "maxlength", message: "Maximum password length should be 12." }
    ],
    confirmpassword: [
      { type: "required", message: "Re-enter Password is required." },
      { type: "minlength", message: "Minimum password length should be 8." },
      { type: "maxlength", message: "Maximum password length should be 12." }
    ]
  };
  constructor(public user: User,
    public util: UtilProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.changeForm = this.formBuilder.group(
      {

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

  // method to comparsion password and new password field
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

  // method to comparsion password and new password field
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  // method for changing password and move to Login page
  changePassword() {
    console.log(this.changeForm.value, "this.loginForm.value");

    this.params = {
      "password": this.changeForm.value.password,
      "confirm": this.changeForm.value.confirmpassword
    }
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })
    this.util.presentLoading();
    this.user.changeAccountPassword(this.params, { headers: headers }).then((result) => {
      this.util.dismissLoading();
      this.util.presentToast('Password changed successfully');
      this.navCtrl.push('LoginPage');
      console.log('setPaymentMethod++++++', result);
    })
      .catch(error => {
        this.util.presentToast(error['error']['error'][0]);
      })
  }
}
