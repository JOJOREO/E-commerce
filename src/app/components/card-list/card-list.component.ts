import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  localItemsList: any;
  gridView = true;
  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.shopService.getItems().subscribe((res) => {
      this.localItemsList = res;
      console.log(this.localItemsList);
      this.shopService.isLoading.next(false);
      // this.shopService.globalLoadingStatus = false;
      // console.log(this.shopService.globalLoadingStatus);
    });
  }

  //function to change view grid/list with default value of parameter as grid+ default value of view variable as true
  onViewChange(viewType: string = 'grid') {
    if (viewType === 'grid') {
      this.gridView = true;
    } else {
      this.gridView = false;
    }
  }
}
