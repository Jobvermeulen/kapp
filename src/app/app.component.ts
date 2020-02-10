import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public static animations = [
        trigger('fadein', [
            state('void', style({opacity: 0})),
            transition('void => *', [
                style({opacity: 0}),
                animate('900ms ease-out', style({opacity: 1}))
            ])
        ]),
        trigger('slidelefttitle', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateX(150%)'}),
                animate('900ms 300ms ease-out', style({transform: 'translateX(0%)', opacity: 1},))
            ])
        ])
    ];

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Zoek kentekens',
            url: '/search-kentekens',
            icon: 'search'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
