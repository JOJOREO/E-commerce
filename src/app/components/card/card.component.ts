import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/services/shop.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() individualShoppingItem: any;
  eyeIconSrc: any = 'assets/images/eye_icons/103796_view_icon_blue.png';
  cartIconSrc: any =
    'assets/images/cart_icons/216477_shopping_cart_icon_green.png';

  numbersArray: any;
  reverseNumbersArray: any;
  // constructor() {}
  constructor(
    private shopService: ShopService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.numbersArray = Array(
      Math.floor(this.individualShoppingItem.rating.rate)
    )
      .fill(0)
      .map((x, i) => i);

    //for  empty stars
    this.reverseNumbersArray = Array(
      5 - Math.floor(this.individualShoppingItem.rating.rate)
    )
      .fill(0)
      .map((x, i) => i);
  }

  getSingleItemLocal(itemId: any) {
    this.shopService.getSingleItem(itemId);
  }

  RoutingFunction(itemId: any) {
    this.router.navigate(['/view-item/' + itemId]);
  }

  IconChanger(iconName: any) {
    if (iconName === 'eyeHover') {
      this.eyeIconSrc = 'assets/images/eye_icons/103796_view_icon_white.png';
    } else if (iconName === 'eye') {
      this.eyeIconSrc = 'assets/images/eye_icons/103796_view_icon_blue.png';
    } else if (iconName === 'cartHover') {
      this.cartIconSrc =
        'assets/images/cart_icons/216477_shopping_cart_icon_white.png';
    } else if (iconName === 'cart') {
      this.cartIconSrc =
        'assets/images/cart_icons/216477_shopping_cart_icon_green.png';
    }
  }
  addToCart = async () => {
    this.loginService.usernameMonitoring.subscribe((usernameResult) => {
      console.log(usernameResult);

      if (usernameResult != 'Guest') {
        this.shopService.isCounting.next(++this.shopService.cartItemsCount);
        // alert('item added to Cart !! ');
        this.toastr.success('Added to Cart successfully !!', 'Item Added');
      }
    });
    // this.shopService.isCounting.next(++this.shopService.cartItemsCount);
    // // alert('item added to Cart !! ');
    // this.toastr.success('item added to Cart successfully !!', 'Item Added');
  };

  onCardClick = () => {
    this.router.navigate(['/view-item/' + this.individualShoppingItem.id]);
  };
}
