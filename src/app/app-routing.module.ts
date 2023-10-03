import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewItemPageComponent } from './view-item-page/view-item-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'view-item/:id', component: ViewItemPageComponent },
  // { path: 'view-item', component: ViewItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
