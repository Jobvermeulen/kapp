import {Component, OnInit} from '@angular/core';
import {KentekenService} from '../../services/kenteken/kenteken.service';
import {AlertController, NavController} from '@ionic/angular';
import {ICar} from '../../interfaces/ICar';
import {ICarFuel} from '../../interfaces/ICarFuel';
import {AppComponent} from '../../app.component';
import {FavoriteCarService} from '../../services/favoriteCar/favorite-car.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-search-kentekens',
    templateUrl: './search-kentekens.page.html',
    styleUrls: ['./search-kentekens.page.scss'],
    animations: [AppComponent.animations]

})
export class SearchKentekensPage implements OnInit {
    searching = false;
    placementCategories = undefined;
    favorite = false;
    passedKenteken: string;

    constructor(private kentekenService: KentekenService,
                public alertController: AlertController,
                private favoriteCarService: FavoriteCarService,
                private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController,
    ) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.passedKenteken = this.router.getCurrentNavigation().extras.state.passingKenteken;
            }
        });
    }

    ngOnInit() {
        if (this.passedKenteken) {
            this.getKenteken(this.passedKenteken);
        }
    }

    async getKenteken(kenteken) {
        this.searching = true;
        try {
            await this.kentekenService.getKenteken(kenteken);
            await this.kentekenService.getFuel(kenteken);

            await this.favoriteCarService.checkFavorite(this.kentekenService.car)
                .then(favorite => {
                    this.favorite = favorite;
                });

            this.buildCategories(this.kentekenService.car, this.kentekenService.carFuel);
        } catch (e) {
            const alert = await this.alertController.create({
                header: 'Geen resultaat',
                message: e.message,
                buttons: ['OK']
            });

            await alert.present();
            console.log(e);
        }

        this.searching = false;
    }

    async addToFavorites() {
        try {
            await this.favoriteCarService.setFavorite(this.kentekenService.car)
                .then(() => {
                    console.log('Added to favorites!');
                    this.favorite = true;
                });
        } catch (e) {
            console.log(e);
        }
    }

    async removeFavorite() {
        try {
            await this.favoriteCarService.removeFavorite(this.kentekenService.car)
                .then(() => {
                    console.log('Removed to favorites!');
                    this.favorite = false;
                });
        } catch (e) {
            console.log(e);
        }
    }

    goToHistory() {
        const queryParams: NavigationExtras = {
            state : {
                passingKenteken: this.kentekenService.car.kenteken
            }
        };

        this.navCtrl.navigateForward(['kenteken-history'], queryParams);
    }

    buildCategories(car: ICar, carFuel: ICarFuel) {
        this.placementCategories = [
            {
                name: 'Global',
                items: [
                    {title: 'Kenteken', item: car.kenteken},
                    {title: 'Merk', item: car.merk},
                    {title: 'Benaming', item: car.handelsbenaming},
                    {title: 'Kleur', item: car.eerste_kleur},
                    {title: 'Zuinigheidslabel', item: car.zuinigheidslabel},
                    {title: 'Catalogusprijs', item: car.catalogusprijs},
                    {title: 'Bruto bpm', item: car.bruto_bpm},
                ],
            },
            {
                name: 'Datums',
                items: [
                    {title: 'Vervaldatum apk', item: this.kentekenService.convertDate(car.vervaldatum_apk)},
                    {title: 'Datum tenaamstelling', item: this.kentekenService.convertDate(car.datum_tenaamstelling)},
                    {title: 'Datum eerste toelating', item: this.kentekenService.convertDate(car.datum_eerste_toelating)},
                    {title: 'Datum eerste afgifte Nederland', item: this.kentekenService.convertDate(car.datum_eerste_afgifte_nederland)},
                ],
            },
            {
                name: 'Gewichten',
                items: [
                    {title: 'Massa ledig voertuig', item: car.massa_ledig_voertuig + ' kg'},
                    {title: 'Toegestane maximum massa voertuig', item: car.toegestane_maximum_massa_voertuig + ' kg'},
                    {title: 'Maximum massa trekken ongeremd', item: car.maximum_massa_trekken_ongeremd + ' kg'},
                    {title: 'Maximum massa trekken geremd', item: car.maximum_trekken_massa_geremd + ' kg'},
                ],
            },
            {
                name: 'Motor',
                items: [
                    {title: 'Aantal cilinders', item: car.aantal_cilinders},
                    {title: 'Cilinderinhoud', item: car.cilinderinhoud},
                ]
            },
            {
                name: 'Benzine', items: [
                    {title: 'Brandstof type', item: carFuel.brandstof_omschrijving},
                    {title: 'Brandstof verbruik buiten', item: carFuel.brandstofverbruik_buiten + ' L/100km'},
                    {title: 'Brandstof verbruik stad', item: carFuel.brandstofverbruik_stad + ' L/100km'},
                    {title: 'Brandstof verbuik gecombineerd', item: carFuel.brandstofverbruik_gecombineerd + ' L/100km'},
                    {title: 'Co2 gecombineerd', item: carFuel.co2_uitstoot_gecombineerd + ' g/km'},
                ],
            },
        ];
    }
}
