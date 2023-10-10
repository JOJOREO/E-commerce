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

  onInputChange = (searchKeywordValue: Event) => {
    this.localSearchKeyword = (<HTMLInputElement>(
      searchKeywordValue.target
    )).value;
    this.shopService.searchKeywordObserver.next(
      (<HTMLInputElement>searchKeywordValue.target).value
    );
    this.shopService.searchKeywordObserver.subscribe((res) => {
      this.localSearchKeyword = res;
    });
  };

  ngOnInit() {
    this.shopService.pageIndexObserver.subscribe((res) => {
      this.localPageIndex = res;

      this.shopService
        .getAllItems(this.localSearchKeyword, this.localPageIndex)
        .subscribe((res) => {
          console.log(res);

          this.shopService.itemsListObserver.next(res);

          this.localItemsList = res;

          let tempArray1: any = [];
          let tempArray2: any = [];
          let tempArray3: any = [];

          this.localItemsList.filter((item: any, index: any) => {
            if (index < 9 && this.localPageIndex === 1) {
              tempArray1.push(item);
            } else if (index > 9 && index < 18 && this.localPageIndex === 2) {
              tempArray2.push(item);
            } else if (index > 18 && this.localPageIndex === 3) {
              tempArray3.push(item);
            }
          });
          if (this.localPageIndex == 1) {
            this.LimitedLocalItemList = tempArray1;
            this.shopService.getAllItems(
              this.localSearchKeyword,
              this.localPageIndex
            );
          } else if (this.localPageIndex == 2) {
            this.LimitedLocalItemList = tempArray2;
            this.shopService.getAllItems(
              this.localSearchKeyword,
              this.localPageIndex
            );
          }
          if (this.localPageIndex == 3) {
            this.LimitedLocalItemList = tempArray3;
            this.shopService.getAllItems(
              this.localSearchKeyword,
              this.localPageIndex
            );
          }

          this.shopService.searchKeywordObserver.subscribe((res) => {
            this.localSearchKeyword = res;

            if (this.localSearchKeyword != '') {
              this.shopService
                .getAllItems(this.localSearchKeyword, this.localPageIndex)
                .subscribe();

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
            }
          });
        });
    });
    this.shopService.loadingStateObserver.next(true);

    this.shopService.pageIndexObserver.subscribe((res) => {});
  }

  onViewChange(viewType: string = 'grid') {
    if (viewType === 'grid') {
      this.gridView = true;
    } else {
      this.gridView = false;
    }
  }
  pageIndexArrows = (arrow: any) => {
    let localIndex = 1;
    this.shopService.pageIndexObserver.subscribe((res) => {
      localIndex = res;
    });

    if (arrow === 'left') {
      if (localIndex > 1) {
        localIndex--;
      } else {
        localIndex = 1;
      }
      this.shopService.pageIndexObserver.next(localIndex);
    } else if (arrow === 'right') {
      if (localIndex < 3) {
        localIndex++;
      } else {
        localIndex = 3;
      }
      this.shopService.pageIndexObserver.next(localIndex);
    }
  };

  pageIndexCounter = (pageIndex: any) => {
    this.shopService.pageIndexObserver.next(pageIndex);
  };
}
