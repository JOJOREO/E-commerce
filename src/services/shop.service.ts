import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shoppingItems = [];
  cartItemsCount = 0;
  singleShoppingItem: any;
  globalLoadingStatus: any = true;
  // isLoading: Subscription = this.globalLoadingStatus.subscribe((res: any) => {
  //   console.log(res);
  // });
  // isLoading: Subscription = new Subscription();

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private _http: HttpClient) {
    // this.isLoading.next(true);
    // console.log(this.globalLoadingStatus);
    // this.isLoading.next(true);
    // console.log(this.isLoading.observed);
  }
  getItems = () => {
    return this._http.get('https://fakestoreapi.com/products?limit=9');
  };
  getSingleItem = (itemId: string) => {
    return this._http.get('https://fakestoreapi.com/products/' + itemId);
  };
  addToCart = () => {
    this.cartItemsCount++;
    //possible to add items by numerous getSingleItem call
  };
}
