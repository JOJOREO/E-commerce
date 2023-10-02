import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-list-view-card',
  templateUrl: './list-view-card.component.html',
  styleUrls: ['./list-view-card.component.css'],
})
export class ListViewCardComponent {
  @Input() individualShoppingItem: any;
  // category: any;
  // description: any;
  // id: any;
  // image: any;
  // price: any;
  // rating: any;
  // title: any;
  numbersArray: any;
  reverseNumbersArray: any;
  constructor() {}
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
}
