import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchKentekensPageRoutingModule } from './search-kentekens-routing.module';

import { SearchKentekensPage } from './search-kentekens.page';
import {KentekenSearchBarModule} from '../../components/kenteken-search-bar/kenteken-search-bar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchKentekensPageRoutingModule,
        ReactiveFormsModule,
        KentekenSearchBarModule
    ],
    declarations: [SearchKentekensPage]
})
export class SearchKentekensPageModule {}
