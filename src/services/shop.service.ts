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

  checkoutTotal: any = 0;
  cart: any = [];

  loadingState: any = true;

  searchKeyword: any = '';

  pageIndex: any = 1;

  itemsList: any = [];

  searchKeywordObserver: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.searchKeyword
  );

  loadingStateObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.loadingState
  );
  cartItemsCountObserver: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.cartItemsCount
  );
  addingCheckoutTotalObserver: BehaviorSubject<number> =
    new BehaviorSubject<number>(this.checkoutTotal);
  individualItemPriceObserver: BehaviorSubject<number[]> = new BehaviorSubject<
    number[]
  >(this.shoppingItemsPrices);
  cartObserver: BehaviorSubject<any> = new BehaviorSubject<any>(this.cart);

  pageIndexObserver: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.pageIndex
  );
  itemsListObserver: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.itemsList
  );

  constructor(private _http: HttpClient) {}
  getItems = (searchKeyword: any) => {
    return this._http.get(
      'https://fakestoreapi.com/products?limit=9&searchWord=' + searchKeyword
    );
  };
  getAllItems = (searchKeyword: any, PageIndex: any) => {
    return this._http.get(
      'https://fakestoreapi.com/products?&searchWord=' +
        searchKeyword +
        '&pageNumber=' +
        PageIndex
    );
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
    this.addingCheckoutTotalObserver.next(this.checkoutTotal + amount);
  };

  calculateTotal = () => {
    let total = 0;
    this.shoppingItemsPrices.map((price) => {
      total += price;
    });
    this.checkoutTotal = total;
    this.addingCheckoutTotalObserver.next(total);
  };
}
