import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'search-kentekens',
        loadChildren: () => import('./pages/search-kentekens/search-kentekens.module').then(m => m.SearchKentekensPageModule)
    },
    {
        path: 'kenteken-history',
        loadChildren: () => import('./pages/kenteken-history/kenteken-history.module').then(m => m.KentekenHistoryPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

