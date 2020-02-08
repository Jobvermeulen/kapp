import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KentekenHistoryPageRoutingModule } from './kenteken-history-routing.module';

import { KentekenHistoryPage } from './kenteken-history.page';
import {KentekenSearchBarModule} from '../../components/kenteken-search-bar/kenteken-search-bar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        KentekenHistoryPageRoutingModule,
        KentekenSearchBarModule
    ],
  declarations: [KentekenHistoryPage]
})
export class KentekenHistoryPageModule {}
