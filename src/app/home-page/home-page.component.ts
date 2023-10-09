import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isLoadingBool: any;
  localPageIndex: any;

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.shopService.loadingStateObserver.subscribe((res) => {
      this.isLoadingBool = res;

      console.log(this.isLoadingBool);
      alert(`isLoadingBool = ${this.isLoadingBool}`);
    });
  }
}
