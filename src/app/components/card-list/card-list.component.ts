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
  LimitedLocalItemList: any = [];
  displayList: any;
  gridView = true;
  constructor(private shopService: ShopService) {}
  localSearchKeyword: any = '';
  localPageIndex: any;
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
    //basic  ,works

    // this.shopService.getItems(this.localSearchKeyword).subscribe((res) => {
    //   this.shopService.isLoading.next(true);
    //   this.shopService.isLoading.subscribe((res) => {
    //     console.log(res);
    //   });

    //   this.localItemsList = res;
    //   console.log(this.localSearchKeyword);

    //   this.shopService.searchKeywordMonitoring.subscribe((res) => {
    //     this.localSearchKeyword = res;
    //     console.log(this.localSearchKeyword);

    //     if (this.localSearchKeyword != '') {
    //       this.shopService.getItems(this.localSearchKeyword).subscribe();
    //       // this.shopService.getItems(this.localSearchKeyword);
    //       console.log(this.localSearchKeyword);
    //       let filteredList: any = [];
    //       this.localItemsList.map((item: any) => {
    //         if (
    //           item.title
    //             .toLowerCase()
    //             .includes(this.localSearchKeyword.toLowerCase())
    //         )
    //           filteredList.push(item);
    //       });
    //       this.displayList = filteredList;
    //     } else {
    //       this.displayList = this.localItemsList;
    //       // this.shopService.getItems('').subscribe((res) => {
    //       // });
    //     }
    //   });
    //   this.shopService.loadingState = false;
    //   this.shopService.isLoading.next(false);
    //   this.shopService.isLoading.subscribe((res) => {
    //     console.log(res);
    //   });
    // });

    //new

    this.shopService.pageIndexCounting.subscribe((res) => {
      this.localPageIndex = res;
      console.log(this.localPageIndex);

      this.shopService
        .getAllItems(this.localSearchKeyword, this.localPageIndex)
        .subscribe((res) => {
          this.shopService.isLoading.next(true);
          // this.shopService.isLoading.subscribe((res) => {
          //   console.log(res);
          // });

          this.shopService.itemsListMonitoring.next(res);

          this.localItemsList = res;
          // console.log(this.localItemsList);
          console.log(this.localSearchKeyword);

          console.log(this.localPageIndex);

          let tempArray1: any = [];
          let tempArray2: any = [];
          let tempArray3: any = [];

          this.localItemsList.filter((item: any, index: any) => {
            // console.log(index);
            // console.log(index < 9 && this.localPageIndex === 1);
            // console.log(index > 9 && index < 18 && this.localPageIndex === 2);
            // console.log(index > 18 && this.localPageIndex === 3);
            // if (this.localPageIndex == 1) {
            //   if (index < 9) {
            //     this.LimitedLocalItemList.push(item);
            //   }
            // } else if (this.localPageIndex === 2) {
            //   if (index > 9 && index < 18) {
            //     this.LimitedLocalItemList.pop();
            //     this.LimitedLocalItemList.push(item);
            //   }
            // } else if (this.localPageIndex === 3) {
            //   if (index > 18) {
            //     this.LimitedLocalItemList.push(item);
            //   }
            // }
            console.log(this.localPageIndex);

            if (index < 9 && this.localPageIndex === 1) {
              // return item;
              tempArray1.push(item);
            } else if (index > 9 && index < 18 && this.localPageIndex === 2) {
              // return item;
              tempArray2.push(item);
            } else if (index > 18 && this.localPageIndex === 3) {
              // return item;
              tempArray3.push(item);
            }
          });
          if (this.localPageIndex == 1) {
            this.LimitedLocalItemList = tempArray1;
          } else if (this.localPageIndex == 2) {
            this.LimitedLocalItemList = tempArray2;
          }
          if (this.localPageIndex == 3) {
            this.LimitedLocalItemList = tempArray3;
          }
          console.log(this.LimitedLocalItemList);

          this.shopService.searchKeywordMonitoring.subscribe((res) => {
            this.localSearchKeyword = res;
            console.log(this.localSearchKeyword);

            if (this.localSearchKeyword != '') {
              this.shopService
                .getAllItems(this.localSearchKeyword, this.localPageIndex)
                .subscribe();
              // this.shopService.getItems(this.localSearchKeyword);
              console.log(this.localSearchKeyword);
              let filteredList: any = [];
              this.LimitedLocalItemList.map((item: any) => {
                if (
                  item.title
                    .toLowerCase()
                    .includes(this.localSearchKeyword.toLowerCase())
                )
                  filteredList.push(item);
              });
              this.displayList = filteredList;
            } else {
              this.displayList = this.LimitedLocalItemList;
              // this.shopService.getItems('').subscribe((res) => {
              // });
            }
          });
          this.shopService.loadingState = false;
          this.shopService.isLoading.next(false);
          // this.shopService.isLoading.subscribe((res) => {
          //   console.log(res);
          // });
        });
    });

    this.shopService.pageIndexCounting.subscribe((res) => {
      console.log('global page index', res);
    });

    // this.shopService.getAllItems(this.localSearchKeyword).subscribe((res) => {
    //   this.shopService.isLoading.next(true);
    //   this.shopService.isLoading.subscribe((res) => {
    //     console.log(res);
    //   });

    //   this.localItemsList = res;
    //   this.shopService.itemsListMonitoring.next(this.localItemsList);
    //   console.log(this.localSearchKeyword);

    //   this.shopService.searchKeywordMonitoring.subscribe((res) => {
    //     this.localSearchKeyword = res;
    //     console.log(this.localSearchKeyword);

    //     if (this.localSearchKeyword != '') {
    //       this.shopService.getAllItems('').subscribe();
    //       // this.shopService.getItems(this.localSearchKeyword);
    //       console.log(this.localSearchKeyword);
    //       let filteredList: any = [];
    //       this.localItemsList.map((item: any) => {
    //         if (
    //           item.title
    //             .toLowerCase()
    //             .includes(this.localSearchKeyword.toLowerCase())
    //         )
    //           filteredList.push(item);
    //       });
    //       this.displayList = filteredList;
    //     } else {
    //       this.displayList = this.localItemsList;
    //       // this.shopService.getItems('').subscribe((res) => {
    //       // });
    //     }
    //   });
    //   this.shopService.loadingState = false;
    //   this.shopService.isLoading.next(false);
    //   this.shopService.isLoading.subscribe((res) => {
    //     console.log(res);
    //   });
    // });

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
  pageIndexArrows = (arrow: any) => {
    let localIndex = 1;
    this.shopService.pageIndexCounting.subscribe((res) => {
      localIndex = res;
    });

    if (arrow === 'left') {
      if (localIndex > 1) {
        localIndex--;
        // this.shopService.pageIndexCounting.next(--localIndex);
      } else {
        localIndex = 1;
        // this.shopService.pageIndex = 1;
        // this.shopService.pageIndexCounting.next(1);
      }
      this.shopService.pageIndexCounting.next(localIndex);
    } else if (arrow === 'right') {
      if (localIndex < 3) {
        localIndex++;
        // this.shopService.pageIndexCounting.next(++localIndex);
      } else {
        localIndex = 3;
        // this.shopService.pageIndex = 3;
        // this.shopService.pageIndexCounting.next(3);
      }
      this.shopService.pageIndexCounting.next(localIndex);
      // this.shopService.getAllItems(this.localSearchKeyword).subscribe((res) => {
      //   this.localItemsList = res;
      // });
    }
  };

  pageIndexCounter = (pageIndex: any) => {
    this.shopService.pageIndexCounting.next(pageIndex);
  };
}
