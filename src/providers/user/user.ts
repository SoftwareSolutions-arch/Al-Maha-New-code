import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class User {
  baseurl = "http://modhish.xyz/almahaopt/api/rest/";
  _user: any;
  base64Image: any;
  picture: any;
  theme: any;

  constructor(public http: HttpClient, private camera: Camera, public api: Api) {
    
  }

  getTheme(){
    return this.theme;
  }
  setTheme(theme){
    this.theme = theme;
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }


  // take picture from camera
  takePicture() {
    this.camera.getPicture({
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      this.picture = imageData;

    }, (err) => {

      console.log(err);

    });
  }

  // access gallery method
  aceesGallery() {
    this.camera.getPicture({

      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

      destinationType: this.camera.DestinationType.DATA_URL

    }).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      this.picture = imageData;

    }, (err) => {

      console.log(err);

    });
  }

  // new register user added
  regiUser(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "register", params, header).subscribe(
        res => {

          if (res['success'] != 0) {
            console.log(res);
            resolve(res);
          }
          else {
            console.log(res);
            reject(res);
          }
        },
        err => {
          console.log("err",err);
          reject(err);
        }
      );
    });
  }

  // login method for existing user
  loginUser(params, header) {
    console.log("enter user.ts file for login creditional")
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "login", params, header).subscribe(
        res => {
          console.log("res",res)
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //forget password for recover password through gmail
  forgetpassword(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + "forgotten", params, header).subscribe(
        res => {

          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }


  // edit account details
  editAccountdetails(params, header) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseurl + "account", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // change Account Password
  changeAccountPassword(params, header) {
    console.log(params,"paramsvalue");
    return new Promise((resolve, reject) => {
      this.http.put(this.baseurl + "account/password", params, header).subscribe(
        res => {
          if (res['success'] != 0) {
            resolve(res);
          }
          else {
            reject(res);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

    //get profile details for signin user
    accountdetails(header) {
      return new Promise((resolve, reject) => {
        this.http.get(this.baseurl + "account", header).subscribe(
          res => {
  
            if (res['success'] != 0) {
              resolve(res);
            }
            else {
              reject(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    }

    //get profile details for signin user
    logoutuser(params,header) {
      return new Promise((resolve, reject) => {
        this.http.post(this.baseurl + "logout",params, header).subscribe(
          res => {
            if (res['success'] != 0) {
              resolve(res);
            }
            else {
              reject(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    }
}
