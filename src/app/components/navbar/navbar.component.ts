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
  disableCart: any = false;
  isCounting: Observable<boolean> | undefined;

  localCartItemsList: any;
  checkoutTotal: any;
  constructor(
    private loginService: LoginService,
    private shopService: ShopService
  ) {
    this.shopService.cartItemsCountObserver.subscribe((res) => {
      this.cartItemsCount = res;
    });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  login() {
    this.loggedIn = true;
    this.loginService.Login().subscribe((responseData) => {
      this.username = responseData.firstName;
      this.userImage = responseData.image;

      this.loginService.userObject = responseData;
      this.loginService.username = responseData.firstName;
      this.loginService.userImage = responseData.image;

      localStorage.setItem(
        'Token',
        JSON.stringify({ token: responseData.token })
      );
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ currentUser: responseData })
      );

      this.shopService.cartItemsCountObserver.next(2);
    });
  }

  logOut() {
    this.loggedIn = false;
    this.username = 'Guest';
    this.userImage =
      'assets/images/403022_business man_male_user_avatar_profile_icon.png';
    localStorage.clear();
    this.shopService.cartItemsCountObserver.next(0);

    this.loginService.userObject = {};
    this.loginService.username = 'Guest';
    this.loginService.userImage =
      'assets/images/403022_business man_male_user_avatar_profile_icon.png';
  }

  ngOnInit(): void {
    this.shopService.cartItemsCountObserver.subscribe((res) => {
      this.cartItemsCount = res;
    });

    if (localStorage.getItem('Token')) {
      this.storedUser = localStorage.getItem('currentUser');

      const splittedUserName = this.storedUser
        .split('firstName')[1]
        .split(',')[0]
        .split(':')[1]
        .replace(/"|'/g, '');

      const splittedUserImage = this.storedUser
        .split('image')[1]
        .split(',')[0]
        .replace(/"|'/g, '')
        .slice(1);

      this.username = splittedUserName;
      this.userImage = splittedUserImage;
      this.loggedIn = true;

      this.shopService.cartItemsCountObserver.next(2);
      this.shopService.cartItemsCount = 2;
      this.loginService.usernameMonitoring.next(splittedUserName);
      this.loginService.userImageMonitoring.next(splittedUserImage);
    }

    this.shopService.getCartItems().subscribe((res) => {
      this.localCartItemsList = res.products;
    });

    this.shopService.addingCheckoutTotalObserver.subscribe((res) => {
      this.checkoutTotal = res;
    });

    this.shopService.cartItemsCountObserver.subscribe((res) => {
      if (this.cartItemsCount == 0) {
        this.disableCart = true;
      } else {
        this.disableCart = false;
        this.shopService.getCartItems().subscribe((res) => {
          this.shopService.cartObserver.next(res.products);
        });
      }
    });
  }
}
