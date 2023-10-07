import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  shoppingItemsPrices = [];
  cartItemsCount: any = 0;
  singleShoppingItem: any;
  globalLoadingStatus: any = true;

  checkoutTotal: any = 0;
  cart: any = [];

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isCounting: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.cartItemsCount
  );
  isAdding: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.checkoutTotal
  );
  isMonitoring: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    this.shoppingItemsPrices
  );
  isMonitoringCart: BehaviorSubject<any> = new BehaviorSubject<any>(this.cart);

  constructor(private _http: HttpClient) {}
  getItems = () => {
    return this._http.get('https://fakestoreapi.com/products?limit=9');
  };
  getCartItems = () => {
    return this._http.get<any>('https://fakestoreapi.com/carts/5');
  };
  getSingleItem = (itemId: string) => {
    return this._http.get('https://fakestoreapi.com/products/' + itemId);
  };

  getItemsWithCategory = (filterCategory: any) => {
    return this._http.get(
      'https://fakestoreapi.com/products/category/' + filterCategory
    );
  };

  getUserCheckoutDetails = () => {
    return this._http.get<any>('https://fakestoreapi.com/users/1');
  };

  addToTotal = (amount: any) => {
    console.log(this.checkoutTotal);
    console.log(amount);
    console.log(this.checkoutTotal + amount);
    this.isAdding.next(this.checkoutTotal + amount);
  };

  calculateTotal = () => {
    let total = 0;
    this.shoppingItemsPrices.map((price) => {
      // console.log(price);
      total += price;
    });
    this.checkoutTotal = total;
    this.isAdding.next(total);
    // console.log(this.checkoutTotal);
  };
}
