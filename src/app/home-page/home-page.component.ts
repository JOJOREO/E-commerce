import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  // localLoadingState: any;
  isLoading: Observable<boolean> | undefined;
  isLoadingBool: any;

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.isLoading = this.shopService.isLoading;
    this.shopService.isLoading.subscribe((res) => {
      this.isLoadingBool = res;
      console.log(this.isLoadingBool);
    });

    // turn off no data alert when data arrive

    // this.shopService.isLoading.next(false);
    // this.shopService.getItems('').subscribe((res) => {
    //   this.shopService.isLoading.next(false);
    // });
  }
}
