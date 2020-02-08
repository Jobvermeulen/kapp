import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {KentekenSearchBarComponent} from './kenteken-search-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    exports: [
        KentekenSearchBarComponent
    ],
    declarations: [KentekenSearchBarComponent]
})
export class KentekenSearchBarModule {}
