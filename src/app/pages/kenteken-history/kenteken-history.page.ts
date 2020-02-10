import {Component, OnInit} from '@angular/core';
import {KentekenService} from '../../services/kenteken/kenteken.service';
import {AlertController, NavController} from '@ionic/angular';
import {ICarIssue} from '../../interfaces/ICarIssue';
import {AppComponent} from '../../app.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-kenteken-history',
    templateUrl: './kenteken-history.page.html',
    styleUrls: ['./kenteken-history.page.scss'],
    animations: AppComponent.animations
})
export class KentekenHistoryPage implements OnInit {
    searching = false;
    placementCategories = undefined;
    passedKenteken: string;

    constructor(private alertController: AlertController,
                private kentekenService: KentekenService,
                private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController
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

    async getKenteken(kenteken: string) {
        this.searching = true;

        try {
            await this.kentekenService.getHistory(kenteken);
            this.buildCategories(this.kentekenService.carIsseus);
        } catch (e) {
            const alert = await this.alertController.create({
                header: 'Geen resultaat',
                message: e.message,
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.back();
                    }
                }]
            });

            await alert.present();
            console.log(e);
        }

        this.searching = false;
    }

    async buildCategories(carIssues: Array<ICarIssue>) {
        this.placementCategories = [];

        carIssues.forEach((key, index) => {
            this.placementCategories.push({
                name: 'Probleem ' + (index + 1),
                items: [
                    {title: 'Datum', item: this.kentekenService.convertDate(key.meld_datum_door_keuringsinstantie)},
                    {title: 'Gebrek indentificatie', item: key.gebrek_identificatie},
                    {title: 'Gebrek', item: key.gebrek_identificatie_text},
                    {title: 'Aantal gebreken geconstateerd', item: key.aantal_gebreken_geconstateerd},
                ],
            });
        });

    }
}
