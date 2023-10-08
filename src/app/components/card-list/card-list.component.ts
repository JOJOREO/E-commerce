import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShopService } from 'src/services/shop.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  localItemsList: any;
  displayList: any;
  gridView = true;
  constructor(private shopService: ShopService) {}
  localSearchKeyword: any = '';
  // searchKeywordMonitoring: BehaviorSubject<string> =
  //   new BehaviorSubject<string>(this.searchKeyword);

  onInputChange = (searchKeywordValue: Event) => {
    console.log((<HTMLInputElement>searchKeywordValue.target).value);
    this.localSearchKeyword = (<HTMLInputElement>(
      searchKeywordValue.target
    )).value;
    this.shopService.searchKeywordMonitoring.next(
      (<HTMLInputElement>searchKeywordValue.target).value
    );
    this.shopService.searchKeywordMonitoring.subscribe((res) => {
      this.localSearchKeyword = res;
      console.log(this.localSearchKeyword);
    });
  };

  ngOnInit() {
    this.shopService.getItems(this.localSearchKeyword).subscribe((res) => {
      this.shopService.loadingState = true;
      this.localItemsList = res;
      // console.log(this.localItemsList);
      console.log(this.localSearchKeyword);

      this.shopService.searchKeywordMonitoring.subscribe((res) => {
        this.localSearchKeyword = res;
        console.log(this.localSearchKeyword);

        if (this.localSearchKeyword != '') {
          this.shopService.getItems(this.localSearchKeyword).subscribe();
          // this.shopService.getItems(this.localSearchKeyword);
          console.log(this.localSearchKeyword);
          let filteredList: any = [];
          this.localItemsList.map((item: any) => {
            if (
              item.title
                .toLowerCase()
                .includes(this.localSearchKeyword.toLowerCase())
            )
              filteredList.push(item);
          });
          this.displayList = filteredList;
        } else {
          this.displayList = this.localItemsList;
          // this.shopService.getItems('').subscribe((res) => {
          // });
        }
      });
      this.shopService.loadingState = false;
      // this.shopService.isLoading.next(false);
    });

    // this.shopService.getItems(this.searchKeyword).subscribe((res) => {
    //   this.shopService.loadingState = true;
    //   this.localItemsList = res;
    //   // console.log(this.localItemsList);
    //   console.log(this.searchKeyword);

    //   this.searchKeywordMonitoring.subscribe((res) => {
    //     this.searchKeyword = res;
    //     console.log(this.searchKeyword);

    //     if (this.searchKeyword != '') {
    //       console.log(this.searchKeyword);
    //       let filteredList: any = [];
    //       this.localItemsList.map((item: any) => {
    //         if (
    //           item.title
    //             .toLowerCase()
    //             .includes(this.searchKeyword.toLowerCase())
    //         )
    //           filteredList.push(item);
    //       });
    //       this.localItemsList = filteredList;
    //     } else {
    //       this.shopService.getItems('').subscribe((res) => {
    //         this.localItemsList = res;
    //       });
    //     }
    //   });
    //   this.shopService.loadingState = false;
    //   // this.shopService.isLoading.next(false);
    // });
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
