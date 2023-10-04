import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shoppingItems = [];
  cartItemsCount: any = 0;
  singleShoppingItem: any;
  globalLoadingStatus: any = true;
  // isLoading: Subscription = this.globalLoadingStatus.subscribe((res: any) => {
  //   console.log(res);
  // });
  // isLoading: Subscription = new Subscription();

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isCounting: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.cartItemsCount
  );

  constructor(private _http: HttpClient) {}
  getItems = () => {
    return this._http.get('https://fakestoreapi.com/products?limit=9');
  };
  getSingleItem = (itemId: string) => {
    return this._http.get('https://fakestoreapi.com/products/' + itemId);
  };
  // addToCart = async () => {
  //   this.cartItemsCount++;
  //   console.log(this.cartItemsCount);
  //   //possible to add items by numerous getSingleItem call
  // };
}
