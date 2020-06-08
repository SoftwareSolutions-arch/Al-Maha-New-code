import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  url: string = 'http://modhish.xyz/almahaopt/api/rest/';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }


  // categories details in Product List pages
  categoriesdetails(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "categories", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // List of all Trending Items
  trendingItems(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "specials", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // getting produts detils
  productsdetails(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "products", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting product detail by id
  getProductbyid(header) {
    let data = localStorage.getItem('productid');
    // console.log("getProductbyid", data);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "products/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting product detail by id
  getProductbyids(header) {
    let data = localStorage.getItem('cartproductid');
    // console.log("getProductbyid", data);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "products/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting all related products
  getRelatedProductsbyid(header) {
    let data = localStorage.getItem('productid');
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "related/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting all cart items
  getcartitems(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "cart", header).subscribe(
        res => {
          // console.log(res, "res");
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

  //method for delete all cart items from the cart
  deleteallCartitems(header) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "cart/empty", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting all related products
  getWishlistdetails(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "wishlist", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting all related products
  deleteWishlistdetails(params, header) {
    // console.log(params, "params")
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "wishlist/" + params, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for add item in the cart
  addtoCart(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "cart", params, header).subscribe(
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

  // method for add item in the Wishlist
  addtomyWishlist(params, header) {
    // console.log("addtomywishlist", params['product_id']);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "wishlist/" + params['product_id'], params, header).subscribe(
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

  // method for add to compare list
  addToCompareList(header) {
    let data = localStorage.getItem('productid');
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "compare/" + data, header).subscribe(
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

  // method for delete single cart items from the cart
  deleteSingleitem(param, header) {
    const headers = new HttpHeaders({
      "X-Oc-Merchant-Id": "KKVHkpjbSyrQ2q8T2W14k1XAjecTDL7H",
      "X-Oc-Session": localStorage.getItem('sessionid')
    })

    // console.log("option+++++", options)
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "cart/" + param, { headers: headers }).subscribe(
        res => {
          // console.log(res, "res");
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



  // method for update cart item
  updateCart(params, header) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "cart", params, header).subscribe(
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

  // method for getting saved address
  getAddress(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "account/address", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for add new shipping address
  addNewaddress(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "account/address", params, header).subscribe(
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

  // method for edit new shipping address
  editAddress(params, header) {

    var data = localStorage.getItem("editaddressid");
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "account/address/" + data, params, header).subscribe(
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

  // method for getting selcted delivery address for orderplaced screen
  getSelectedaddress(header) {
    let data = localStorage.getItem('addressid');
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "account/address/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for getting selcted delivery address for orderplaced screen
  editSelectedaddress(header) {
    let data = localStorage.getItem('editaddressid');
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "account/address/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for choose Shipping Address
  confirmPaymentAddress(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "paymentaddress/existing", params, header).subscribe(
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

  // method for choose shipping  address
  confirmShippingaddress(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "shippingaddress/existing", params, header).subscribe(
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

  // get payment method
  getPaymentMethod(header) {
    let data = localStorage.getItem('addressid');
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "paymentmethods/" + data, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // set payment method
  setPaymentMethod(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "paymentmethods", params, header).subscribe(
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

  // set payment method
  confirmOrder(params, header) {
    console.log("params",params)
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "confirm", params, header).subscribe(
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

  // get shipping method
  getShippingMethod(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "shippingmethods", header).subscribe(
        res => {
          // console.log(res, "res");
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

  // setShipping Method
  setShippingMethod(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "shippingmethods", params, header).subscribe(
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

  // method for edit new shipping address
  deleteAddress(params, header) {
    // var data = localStorage.getItem("editaddressid");
    // console.log(params['address_id'], "paramsidvalue+++++");
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "account/address/" + params['address_id'], header).subscribe(
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
    }
    );
  }

  // get Category by category id in product list page
  getCategorybyid(value, header) {
    // console.log("value", value.category_id);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "categories/" + value.category_id, header).subscribe(
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

  // get Category by category id in product list page
  getCategorybyfilter(params, header) {
    // console.log("paramsparams", params.filter_id);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "products/category/" + params.category_id + "/filters/" + params.filter_id, header).subscribe(
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

  // method for search products
  getSearchProducts(val, header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "products/search/" + val, header).subscribe(
        res => {
          // console.log(res, "res");
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

  // method for add item in the cart
  contactwithus(params, header) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "contact", params, header).subscribe(
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
  // get payment method
  orderStatus(header) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "order_statuses", header).subscribe(
        res => {
          // console.log(res, "res");
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

  myorderdetails(params, header) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "order_statuses", params, header).subscribe(
        res => {
          // console.log(res, "res");
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

export function getServerPath() {
  let returnValue;
  returnValue = 'http://37.99.145.22/almahaopt/';//almahaopt Server
  return returnValue;
}
