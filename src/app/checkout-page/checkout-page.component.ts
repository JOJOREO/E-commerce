import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  disablePurchase: any = false;
  delete: any;
  constructor(
    private shopService: ShopService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isMonitoringAddress: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.address
  );
  ngOnInit(): void {
    this.disablePurchase = false;
    if (this.checkoutTotal === 0) {
      this.disablePurchase = true;
    }

    this.shopService.addingCheckoutTotalObserver.subscribe((result) => {
      this.checkoutTotal = result;
      if (this.checkoutTotal === 0) {
        this.disablePurchase = true;
      }
    });
    this.shopService.getUserCheckoutDetails().subscribe((result) => {
      this.disablePurchase = false;
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
    });

    this.shopService.getCartItems().subscribe((res) => {
      this.localItemsList = res.products;
      console.log(this.localItemsList);

      this.localItemsList.map((item: any) => {
        this.shopService.getSingleItem(item.productId).subscribe((res) => {
          console.log(res);

          this.local_Objects_ItemsList.push(res);
        });
      });
    });
  }
  onSubmit = (form: NgForm) => {
    this.toastr.success(
      'Items on delivery successfully !!',
      'Purchase Successful'
    );
    this.shopService.cartObserver.next([]);
    this.shopService.cartItemsCountObserver.next(0);
    this.shopService.addingCheckoutTotalObserver.next(0);
    this.router.navigate(['']);
  };
  purchaseDone = () => {};

  deleteCard = (item: any) => {
    console.log(item);
    let index = this.localItemsList.indexOf(item);
    console.log(index);
    this.localItemsList.splice(index, 1);
    console.log(this.localItemsList);
  };
}
