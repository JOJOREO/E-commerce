import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-drop-down-card',
  templateUrl: './drop-down-card.component.html',
  styleUrls: ['./drop-down-card.component.css'],
})
export class DropDownCardComponent implements OnInit {
  @Input() individualShoppingItem: any;
  itemDetails: any;
  eyeIconSrc: any = 'assets/images/eye_icons/103796_view_icon_blue.png';
  cartIconSrc: any =
    'assets/images/cart_icons/216477_shopping_cart_icon_green.png';

  numbersArray: any;
  reverseNumbersArray: any;

  deleteIconSrc: any =
    'assets/images/delete_icons/185090_delete_garbage_icon_red.png';
  cartItemQuantity: any;
  cartItemCost: any;

  localTotalCost: any;

  clicked: any = false;

  // constructor() {}
  constructor(private shopService: ShopService, private router: Router) {}
  ngOnInit(): void {
    this.clicked = false;
    console.log(this.individualShoppingItem);
    this.cartItemQuantity = this.individualShoppingItem.quantity;
    console.log(this.cartItemQuantity);
    this.shopService
      .getSingleItem(this.individualShoppingItem.productId)
      .subscribe((res) => {
        console.log(res);
        this.itemDetails = res;
        console.log(this.itemDetails);
        this.cartItemCost = this.itemDetails.price;
        // this.shopService.addToTotal(this.itemDetails.price);

        this.shopService.isAdding.subscribe((res) => {
          this.localTotalCost = res;
          // console.log(this.localTotalCost);
        });

        this.calculateItemCost(parseInt(this.cartItemQuantity));
      });

    // this.shopService.isAdding.next(this.localTotalCost + total);

    // console.log(this.itemDetails);
    // this.numbersArray = Array(
    //   Math.floor(this.individualShoppingItem.rating.rate)
    // )
    //   .fill(0)
    //   .map((x, i) => i);

    // //for  empty stars
    // this.reverseNumbersArray = Array(
    //   5 - Math.floor(this.individualShoppingItem.rating.rate)
    // )
    //   .fill(0)
    //   .map((x, i) => i);
  }

  getSingleItemLocal(itemId: any) {
    this.shopService.getSingleItem(itemId);
  }

  RoutingFunction(itemId: any) {
    this.router.navigate(['/view-item/' + itemId]);
  }

  IconChanger(iconName: any) {
    if (iconName === 'deleteHover') {
      this.deleteIconSrc =
        'assets/images/delete_icons/185090_delete_garbage_icon_white.png';
    } else if (iconName === 'delete') {
      this.deleteIconSrc =
        'assets/images/delete_icons/185090_delete_garbage_icon_red.png';
    }
  }

  calculateItemCost = (count: any) => {
    if (count < 0) {
      alert('please enter a positive number !!');
      return;
    }
    // console.log(this.itemDetails.price);
    // console.log(parseInt(this.itemDetails.price));
    let total = parseInt(this.itemDetails.price) * count;
    this.cartItemCost = parseInt(this.itemDetails.price) * count;
    // console.log(total);
    // console.log(this.shopService.checkoutTotal);
    // console.log(this.shopService.checkoutTotal + total);
    // this.shopService.addToTotal(total);

    this.shopService.isMonitoring.subscribe((res) => {
      res[this.individualShoppingItem.productId] = this.cartItemCost;
      // console.log(res[this.individualShoppingItem.productId]);
    });

    // *****
    this.shopService.calculateTotal();
    // this.shopService.isAdding.next(this.localTotalCost + total);
  };

  subtractItemCost = (amount: any) => {
    // console.log(this.itemDetails.price);
    // console.log(parseInt(this.itemDetails.price));
    // let total = parseInt(this.itemDetails.price) * count;
    // this.cartItemCost = parseInt(this.itemDetails.price) * count;
    // console.log(total);
    // console.log(this.shopService.checkoutTotal);
    // console.log(this.shopService.checkoutTotal + total);
    // this.shopService.addToTotal(total);
    this.shopService.isAdding.next(this.localTotalCost - amount);
  };

  deleteCartItem = () => {
    console.log('deleting');
    this.clicked = true;
    console.log('clicked', this.clicked);
    console.log('cartItemCost', this.cartItemCost);
    this.subtractItemCost(this.cartItemCost);
    this.shopService.isCounting.subscribe((res) => {
      console.log(res);
    });

    // --this.shopService.cartItemsCount;
    this.shopService.isCounting.next(--this.shopService.cartItemsCount);
  };

  // addToCart = async () => {
  //   this.shopService.isCounting.next(++this.shopService.cartItemsCount);

  //   alert('item added to Cart !! ');
  // };
}
