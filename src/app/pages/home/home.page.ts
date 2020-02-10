import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {FavoriteCarService} from '../../services/favoriteCar/favorite-car.service';
import {NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [AppComponent.animations]
})
export class HomePage implements OnInit {
    favoriteCars = [];

    constructor(private favoriteCarService: FavoriteCarService, private navCtrl: NavController) {
    }

    async ngOnInit() {
        try {
            await this.favoriteCarService.getFavoritesList()
                .then(result => {
                    this.favoriteCars = result;
                });
        } catch (e) {
            console.log(e);
        }
    }

    goToKentekenSearch(kenteken) {
        const queryParams: NavigationExtras = {
            state : {
                passingKenteken: kenteken
            }
        };

        this.navCtrl.navigateRoot(['search-kentekens'], queryParams);
    }
}
