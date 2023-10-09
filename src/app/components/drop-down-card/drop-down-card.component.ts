import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-drop-down-card',
  templateUrl: './drop-down-card.component.html',
  styleUrls: ['./drop-down-card.component.css'],
})
export class DropDownCardComponent implements OnInit {
  @Input() individualShoppingItem: any;
  @Output() delete: EventEmitter<string> = new EventEmitter();
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

  constructor(private shopService: ShopService, private router: Router) {}
  ngOnInit(): void {
    this.clicked = false;

    this.cartItemQuantity = this.individualShoppingItem.quantity;

    this.shopService
      .getSingleItem(this.individualShoppingItem.productId)
      .subscribe((res) => {
        this.itemDetails = res;

        this.cartItemCost = this.itemDetails.price;

        this.shopService.addingCheckoutTotalObserver.subscribe((res) => {
          this.localTotalCost = res;
        });

        this.calculateItemCost(parseInt(this.cartItemQuantity));
      });
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

    let total = parseInt(this.itemDetails.price) * count;
    this.cartItemCost = parseInt(this.itemDetails.price) * count;

    this.shopService.individualItemPriceObserver.subscribe((res) => {
      res[this.individualShoppingItem.productId] = this.cartItemCost;
    });

    this.shopService.calculateTotal();
  };

  subtractItemCost = (amount: any) => {
    this.shopService.addingCheckoutTotalObserver.next(
      this.localTotalCost - amount
    );
  };

  deleteCartItem = () => {
    this.clicked = true;

    this.subtractItemCost(this.cartItemCost);
    this.shopService.cartItemsCountObserver.subscribe((res) => {});

    this.shopService.cartItemsCountObserver.next(
      --this.shopService.cartItemsCount
    );

    this.delete.emit(this.individualShoppingItem);
  };
}
