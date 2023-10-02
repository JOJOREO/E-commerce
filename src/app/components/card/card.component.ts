import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
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

    // this.category = this.individualShoppingItem.category;
    // console.log(Math.floor(this.individualShoppingItem.rating.rate));
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
