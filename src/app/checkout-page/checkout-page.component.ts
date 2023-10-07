import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  address: any = 'xxx';
  phone: any = '';
  email: any = '';
  localItemsList: any;
  local_Objects_ItemsList: any;
  checkoutTotal: any;
  constructor(private shopService: ShopService) {}

  isMonitoringAddress: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.address
  );
  ngOnInit(): void {
    this.shopService.isAdding.subscribe((result) => {
      this.checkoutTotal = result;
    });
    this.shopService.getUserCheckoutDetails().subscribe((result) => {
      console.log(result);
      this.address =
        result.address.number +
        ' ' +
        result.address.street +
        ' ' +
        result.address.city;
      this.phone = result.phone;
      this.email = result.email;

      this.isMonitoringAddress.next(result.phone);

      console.log(this.address);
      console.log(this.email);
      console.log(this.phone);
    });

    console.log(this.address);
    console.log(this.email);
    console.log(this.phone);

    //

    this.shopService.getCartItems().subscribe((res) => {
      this.localItemsList = res.products;
      console.log(this.localItemsList);

      this.localItemsList.map((item: any) => {
        this.shopService.getSingleItem(item.productId).subscribe((res) => {
          console.log(res);

          this.local_Objects_ItemsList.push(res);
          //  this.itemDetails = res;
          //  console.log(this.itemDetails);
          //  this.cartItemCost = this.itemDetails.price;
          // this.shopService.addToTotal(this.itemDetails.price);

          //  this.shopService.isAdding.subscribe((res) => {
          //    this.localTotalCost = res;
          //    // console.log(this.localTotalCost);
          //  });

          //  this.calculateItemCost(parseInt(this.cartItemQuantity));
        });
      });
      // this.shopService.isLoading.next(false);
    });
    console.log(this.local_Objects_ItemsList);

    //
  }
  onSubmit = (form: NgForm) => {};
}
