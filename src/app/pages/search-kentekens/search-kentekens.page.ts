import {Component, OnInit} from '@angular/core';
import {KentekenService} from '../../services/kenteken/kenteken.service';
import {AlertController} from '@ionic/angular';
import {ICar} from '../../interfaces/ICar';
import {ICarFuel} from '../../interfaces/ICarFuel';

@Component({
    selector: 'app-search-kentekens',
    templateUrl: './search-kentekens.page.html',
    styleUrls: ['./search-kentekens.page.scss'],
})
export class SearchKentekensPage implements OnInit {
    searching = false;
    placementCategories = undefined;

    constructor(private kentekenService: KentekenService,
                public alertController: AlertController) {
    }

    ngOnInit() {
    }

    async getKenteken(kenteken) {
        this.searching = true;
        try {
            await this.kentekenService.getKenteken(kenteken);
            await this.kentekenService.getFuel(kenteken);

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
