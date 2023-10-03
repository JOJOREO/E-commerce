import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-view-item-page',
  templateUrl: './view-item-page.component.html',
  styleUrls: ['./view-item-page.component.css'],
})
export class ViewItemPageComponent implements OnInit {
  eyeIconSrc: any = 'assets/images/eye_icons/103796_view_icon_blue.png';
  cartIconSrc: any =
    'assets/images/cart_icons/216477_shopping_cart_icon_green.png';
  displayedItem: any;
  starsNumbersArray: any;
  reverseStarsNumbersArray: any;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.shopService
      .getSingleItem(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.displayedItem = res;
        console.log(this.displayedItem);
        this.starsNumbersArray = Array(
          Math.floor(this.displayedItem.rating.rate)
        )
          .fill(0)
          .map((x, i) => i);

        //for  empty stars
        this.reverseStarsNumbersArray = Array(
          5 - Math.floor(this.displayedItem.rating.rate)
        )
          .fill(0)
          .map((x, i) => i);
      });

    // this.displayedItem = this.shopService.singleShoppingItem;
    // console.log(this.displayedItem);
    this.starsNumbersArray = Array(Math.floor(this.displayedItem.rating.rate))
      .fill(0)
      .map((x, i) => i);

    //for  empty stars
    this.reverseStarsNumbersArray = Array(
      5 - Math.floor(this.displayedItem.rating.rate)
    )
      .fill(0)
      .map((x, i) => i);
  }
  // getSingleItemLocal(itemId: any) {
  //   this.shopService.getSingleItem(itemId);
  // }
  getSingleItemLocal(itemId: any) {
    // this.shopService
    //   .getSingleItem(this.route.snapshot.params['id'])
    //   .subscribe((res) => {
    //     this.displayedItem = res;
    //     console.log(this.displayedItem);
    //   });
    // this.shopService.getSingleItem(itemId);
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
}
