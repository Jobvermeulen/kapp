import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IFavoriteCar} from '../../interfaces/IFavoriteCar';

@Injectable({
    providedIn: 'root'
})
export class FavoriteCarService {
    storageAccessor = 'favoriteCar';

    constructor(private storage: Storage) {
    }

    setFavorite(car) {
        return this.storage.get(this.storageAccessor)
            .then(async result => {
                const favoriteCar: IFavoriteCar = await this.setFavoriteCarObject(car);
                if (result) {
                    result.push(favoriteCar);
                    return this.storage.set(this.storageAccessor, result);
                } else {
                    return this.storage.set(this.storageAccessor, [favoriteCar]);
                }
            });
    }

    removeFavorite(car) {
        return this.storage.get(this.storageAccessor)
            .then(async result => {
                const favoriteCar: IFavoriteCar = await this.setFavoriteCarObject(car);
                const index = result.map(favCar => {
                    return favCar.kenteken;
                }).indexOf(favoriteCar.kenteken);

                result.splice(index, 1);
                return this.storage.set(this.storageAccessor, result);
            });
    }

    checkFavorite(car) {
        return this.storage.get(this.storageAccessor)
            .then(async result => {
                const favoriteCar: IFavoriteCar = await this.setFavoriteCarObject(car);
                if (result) {
                    return result.find(favoCar => favoCar.kenteken === favoriteCar.kenteken);
                } else {
                    return false;
                }
            });
    }

    getFavoritesList() {
        return this.storage.get(this.storageAccessor)
            .then(result => {
                return result;
            });
    }

    setFavoriteCarObject(car): IFavoriteCar {
        return {
            handelsbenaming: car.handelsbenaming,
            kenteken: car.kenteken,
            merk: car.merk
        };
    }
}
