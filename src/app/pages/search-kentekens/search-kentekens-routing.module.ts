import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchKentekensPage } from './search-kentekens.page';

const routes: Routes = [
  {
    path: '',
    component: SearchKentekensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchKentekensPageRoutingModule {}
