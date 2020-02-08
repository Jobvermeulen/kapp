import {Injectable} from '@angular/core';
import {Routes} from '../../globals/routes';
import {ApiService} from '../Api/api.service';
import {ICar} from '../../interfaces/ICar';
import {ICarFuel} from '../../interfaces/ICarFuel';
import {ICarIssue} from '../../interfaces/ICarIssue';

@Injectable({
    providedIn: 'root'
})
export class KentekenService {
    car: ICar;
    carFuel: ICarFuel;
    carIsseus: Array<ICarIssue> = [];

    constructor(private api: ApiService) {
    }

    throwNotFoundError() {
        throw new Error('Bij het opzoeken van dit kenteken is er geen informatie gevonden.');
    }

    async getKenteken(kenteken) {
        await this.api.get(Routes.ROUTES.baseRoute + Routes.ROUTES.getKenteken + '?kenteken=' + kenteken)
            .then(response => {
                if (response[0] !== undefined) {
                    this.car = response[0];
                } else {
                    this.throwNotFoundError();
                }
            });
    }

    async getFuel(kenteken) {
        await this.api.get(Routes.ROUTES.baseRoute + Routes.ROUTES.getFuel + '?kenteken=' + kenteken)
            .then(response => {
                if (response[0] !== undefined) {
                    this.carFuel = response[0];
                }
            });
    }

    async getHistory(kenteken) {
        await this.api.get(Routes.ROUTES.baseRoute + Routes.ROUTES.getHistory + '?kenteken=' + kenteken)
            .then(async response => {
                if (response[0] !== undefined) {
                    this.carIsseus = [];
                    Object.keys(response).map(key => {
                        this.carIsseus.push(response[key]);
                    });

                    for (const key of this.carIsseus) {
                        key.gebrek_identificatie_text = await this.getIssueByCode(key.gebrek_identificatie);
                    }
                    console.log(this.carIsseus);
                } else {
                    this.throwNotFoundError();
                }
            });
    }


    async getIssueByCode(issueCode): Promise<string> {
        let gebrekText = 'Niet gevonden';

        await this.api.get(Routes.ROUTES.baseRoute + Routes.ROUTES.getIssue + '?gebrek_identificatie=' + issueCode)
            .then(response => {
                if (response[0] !== undefined) {
                    gebrekText = response[0].gebrek_omschrijving;
                } else {
                    this.throwNotFoundError();
                }
            });
        return gebrekText;
    }

    convertDate(strDate) {
        let date = strDate.slice(6, 8) + ' - ';
        date += strDate.slice(4, 6) + ' - ';
        date += strDate.slice(0, 4);

        return date;
    }
}
