import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-list-view-card',
  templateUrl: './list-view-card.component.html',
  styleUrls: ['./list-view-card.component.css'],
})
export class ListViewCardComponent {
  @Input() individualShoppingItem: any;
  eyeIconSrc: any = 'assets/images/eye_icons/103796_view_icon_blue.png';
  cartIconSrc: any =
    'assets/images/cart_icons/216477_shopping_cart_icon_green.png';
  numbersArray: any;
  reverseNumbersArray: any;
  constructor(private shopService: ShopService, private router: Router) {}
  ngOnInit(): void {
    console.log(this.individualShoppingItem);

    this.numbersArray = Array(
      Math.floor(this.individualShoppingItem.rating.rate)
      // Math.floor(5)
    )
      .fill(0)
      .map((x, i) => i);
    //for  empty stars
    this.reverseNumbersArray = Array(
      // Math.floor(this.individualShoppingItem.rating.rate)
      5 - Math.floor(this.individualShoppingItem.rating.rate)
    )
      .fill(0)
      .map((x, i) => i);
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
    this.shopService.isCounting.next(++this.shopService.cartItemsCount);

    alert('item added to Cart !! ');
  };
}
