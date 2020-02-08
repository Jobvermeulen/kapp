import {Component, OnInit} from '@angular/core';
import {KentekenService} from '../../services/kenteken/kenteken.service';
import {AlertController} from '@ionic/angular';
import {ICar} from '../../interfaces/ICar';
import {ICarFuel} from '../../interfaces/ICarFuel';
import {ICarIssue} from '../../interfaces/ICarIssue';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-kenteken-history',
    templateUrl: './kenteken-history.page.html',
    styleUrls: ['./kenteken-history.page.scss'],
})
export class KentekenHistoryPage implements OnInit {
    searching = false;
    placementCategories = undefined;

    constructor(private alertController: AlertController, private kentekenService: KentekenService) {
    }

    ngOnInit() {
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
                buttons: ['OK']
            });

            await alert.present();
            console.log(e);
        }
        console.log('From kenteken-history ', kenteken);

        this.searching = false;
    }

    async buildCategories(carIssues: Array<ICarIssue>) {
        this.placementCategories = [];
        // this.placementCategories
        // this.placementCategories = [
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

        console.log(this.placementCategories);
        // await this.placementCategories.push(carIssues.forEach((key, index) => {
        //         return {
        //             name: 'Probleem ' + index,
        //             items: [
        //                 {title: 'Datum', item: this.kentekenService.convertDate(key.meld_datum_door_keuringsinstantie)},
        //                 {title: 'Gebrek indentificatie', item: key.gebrek_identificatie},
        //                 {title: 'Gebrek', item: key.gebrek_identificatie_text},
        //                 {title: 'Aantal gebreken geconstateerd', item: key.aantal_gebreken_geconstateerd},
        //             ],
        //         };
        //     })
        // );
    }
}
