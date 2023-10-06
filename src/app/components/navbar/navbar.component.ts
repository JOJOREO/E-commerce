import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/login.service';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  storedUser: any = {};
  loggedIn: any = false;
  username: any = this.loginService.username;
  userImage: any = this.loginService.userImage;

  cartItemsCount: any;
  isCounting: Observable<boolean> | undefined;

  localCartItemsList: any;
  checkoutTotal: any;
  constructor(
    private loginService: LoginService,
    private shopService: ShopService
  ) {
    // this.isCounting = this.shopService.isCounting;
    this.shopService.isCounting.subscribe((res) => {
      this.cartItemsCount = res;
      console.log(this.cartItemsCount);
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  login() {
    console.log(this.loggedIn);
    this.loggedIn = true;
    this.loginService.Login();
    // this.storedUser = this.loginService.userObject;
    this.username = this.loginService.username;
    this.userImage = this.loginService.userImage;
    this.storedUser = this.loginService.userObject;
    console.log(this.loggedIn);
    console.log(this.username);
    console.log(this.userImage);
    console.log(this.loginService.username);
    console.log(this.loginService.userImage);

    localStorage.setItem(
      'Token',
      JSON.stringify({ token: this.storedUser.token })
    );
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ currentUser: this.storedUser })
    );

    this.loginService.usernameMonitoring.next(this.username);
    this.shopService.isCounting.next(2);
    this.shopService.cartItemsCount = 2;
    // this.shopService.isCounting.next(++this.shopService.cartItemsCount);
  }

  logOut() {
    this.loggedIn = false;
    this.username = 'Guest';
    this.userImage =
      'assets/images/403022_business man_male_user_avatar_profile_icon.png';
    localStorage.clear();
    this.shopService.isCounting.next(0);
    // this.loginService.usernameMonitoring.next('');
    // this.loginService.Login();
    // this.username = this.loginService.username;
    // this.userImage = this.loginService.userImage;
  }

  ngOnInit(): void {
    this.loginService.Login();

    this.shopService.isCounting.subscribe((res) => {
      this.cartItemsCount = res;
      console.log(this.cartItemsCount);
    });

    if (localStorage.getItem('Token')) {
      // console.log(localStorage.getItem('currentUser'));
      this.storedUser = localStorage.getItem('currentUser');
      // console.log(this.storedUser);
      const splittedUserName = this.storedUser
        .split('firstName')[1]
        .split(',')[0]
        .split(':')[1]
        .replace(/"|'/g, '');
      // console.log(splittedUserName);
      const splittedUserImage = this.storedUser
        .split('image')[1]
        .split(',')[0]
        .replace(/"|'/g, '')
        .slice(1);
      // console.log(splittedUserImage);
      this.username = splittedUserName;
      this.userImage = splittedUserImage;
      this.loggedIn = true;

      this.shopService.isCounting.next(2);
      this.shopService.cartItemsCount = 2;
      this.loginService.usernameMonitoring.next(splittedUserName);
      this.loginService.userImageMonitoring.next(splittedUserImage);

      // this.loginService.usernameMonitoring.next(splittedUserName);
      // this.loginService.userImageMonitoring.next(splittedUserImage)
      //  token = storedUser.token;
    }

    //cart fetch

    this.shopService.getCartItems().subscribe((res) => {
      this.localCartItemsList = res.products;
      console.log(this.localCartItemsList);
      // this.shopService.isLoading.next(false);
    });

    this.shopService.isAdding.subscribe((res) => {
      console.log(res);
      this.checkoutTotal = res;
    });
  }

  // gridView = true;
}
