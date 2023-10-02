import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shoppingItems = [];
  cartItemsCount = 0;
  constructor(private _http: HttpClient) {}
  getItems = () => {
    // let data = await fetch('https://fakestoreapi.com/products');
    // let response = await data.json();

    // let data = await fetch('https://fakestoreapi.com/products?limit=9');
    // let response = await data.json();
    // console.log('response at service', response);
    // this.shoppingItems = response;
    // console.log('shopping items at service', this.shoppingItems);

    return this._http.get('https://fakestoreapi.com/products?limit=9');
  };
  getSingleItem = async (itemId: string) => {
    let data = await fetch('https://fakestoreapi.com/products/' + itemId);
    let response = await data.json();
    console.log(response);
  };
  addToCart = () => {};
}
