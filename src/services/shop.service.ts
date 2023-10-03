import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shoppingItems = [];
  cartItemsCount = 0;
  singleShoppingItem: any;
  constructor(private _http: HttpClient) {}
  getItems = () => {
    return this._http.get('https://fakestoreapi.com/products?limit=9');
  };
  getSingleItem = (itemId: string) => {
    return this._http.get('https://fakestoreapi.com/products/' + itemId);
    // this._http
    //   .get('https://fakestoreapi.com/products/' + itemId)
    //   .subscribe((item) => {
    //     this.singleShoppingItem = item;
    //     console.log(this.singleShoppingItem);
    //     console.log(item);
    //   });
  };
  addToCart = () => {
    this.cartItemsCount++;
    //possible to add items by numerous getSingleItem call
  };
}
