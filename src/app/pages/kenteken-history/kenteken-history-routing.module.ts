import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KentekenHistoryPage } from './kenteken-history.page';

const routes: Routes = [
  {
    path: '',
    component: KentekenHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KentekenHistoryPageRoutingModule {}
