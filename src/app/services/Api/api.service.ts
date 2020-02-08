import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) {
    }

    async get(route) {
        const header: object = new HttpHeaders({
            'X-App-Token': environment.X_app_token,
        });

        return this.http.get(route, header).toPromise();
    }
}
