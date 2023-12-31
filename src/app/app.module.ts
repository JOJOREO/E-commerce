import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ListViewCardComponent } from './components/list-view-card/list-view-card.component';
import { CommonModule } from '@angular/common';
import { ShopService } from 'src/services/shop.service';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './shorten.pipe';
import { ViewItemPageComponent } from './view-item-page/view-item-page.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { LoginService } from 'src/services/login.service';
import { DropDownCardComponent } from './components/drop-down-card/drop-down-card.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CardComponent,
    CardListComponent,
    ListViewCardComponent,
    ShortenPipe,
    ViewItemPageComponent,
    FooterComponent,
    LoadingPageComponent,
    DropDownCardComponent,
    CheckoutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [ShopService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
